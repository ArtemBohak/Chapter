import { nanoid } from "@reduxjs/toolkit";

import { uploadFilesApi } from "@/src/axios";
import { hashingString } from "@/src/utils";
import { FileArgs } from "@/src/types";

import { Params, Path } from "./Files.type";

const {
  VITE_CLOUDINARY_CLOUD_NAME,
  VITE_CLOUDINARY_API_KEY,
  VITE_CLOUDINARY_API_SECRET,
} = import.meta.env;

class FilesService {
  private cloudName = VITE_CLOUDINARY_CLOUD_NAME;
  private apiKey = VITE_CLOUDINARY_API_KEY;
  private apiSecret = VITE_CLOUDINARY_API_SECRET;

  private formats = ["webp"];

  private createSignature(params: Params) {
    const baseString = Object.keys(params)
      .map((key) => `${key}=${params[key as keyof Params]}`)
      .join("&");

    return hashingString(`${baseString}${this.apiSecret}`);
  }

  private imageTransformString({
    avatar,
    transform,
    height = 216,
    width = 216,
    radius = 10,
  }: Partial<FileArgs>) {
    if (avatar)
      return transform
        ? transform
        : `c_thumb,h_${height},w_${width}/r_${radius}`;

    return transform ? transform : `c_thumb,h_${height},w_${width}`;
  }

  async upload({
    file,
    id,
    path,
    avatar,
    overwrite = true,
    format = "webp",
    tags = [],
    formats = [],
    alt,
    ...args
  }: FileArgs) {
    try {
      const defaultPath = avatar ? Path.AVATAR : Path.POSTS;
      const imageTags = tags.length ? tags : [...defaultPath.split("/")];
      const context = `alt=${alt ? alt : defaultPath.split("/")}`;

      const params = {
        allowed_formats: [...this.formats, ...formats],
        context,
        eager: this.imageTransformString({ avatar, ...args }),
        folder: path || defaultPath,
        format,
        overwrite,
        public_id: avatar ? id + "" : id + "_" + nanoid(),
        tags: imageTags,
        timestamp: Math.floor(Date.now() / 1000),
      };
      const signature = this.createSignature(params);

      const res = await uploadFilesApi.post(`${this.cloudName}/image/upload`, {
        file,
        api_key: this.apiKey,
        signature,
        ...params,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      const params = {
        public_id: id,
        timestamp: Math.floor(Date.now() / 1000),
      };

      const signature = this.createSignature(params);

      const res = await uploadFilesApi.post(`${this.cloudName}/image/destroy`, {
        api_key: this.apiKey,
        signature,
        ...params,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default FilesService;
