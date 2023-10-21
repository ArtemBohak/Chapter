import { nanoid } from "@reduxjs/toolkit";

import { uploadFilesApi } from "@/src/axios";
import { hashingString } from "@/src/utils";
import { FileUploadArgs, Params, UploadParams, Path } from "./Files.type";

const {
  VITE_CLOUDINARY_CLOUD_NAME,
  VITE_CLOUDINARY_API_KEY,
  VITE_CLOUDINARY_API_SECRET,
} = import.meta.env;

class FilesService {
  private static cloudName = VITE_CLOUDINARY_CLOUD_NAME;
  private static apiKey = VITE_CLOUDINARY_API_KEY;
  private static apiSecret = VITE_CLOUDINARY_API_SECRET;
  private static formats = ["webp"];

  private static createSignature(params: Params) {
    const baseString = Object.keys(params)
      .map((key) => `${key}=${params[key as keyof Params]}`)
      .join("&");

    return hashingString(`${baseString}${FilesService.apiSecret}`);
  }

  private static imageTransformString({
    avatar,
    transform,
    height = 216,
    width = 216,
    radius = 10,
  }: Partial<FileUploadArgs>) {
    if (avatar)
      return transform
        ? transform
        : `c_thumb,h_${height},w_${width}/r_${radius}`;

    return transform ? transform : `c_thumb,h_${height},w_${width}`;
  }

  static async upload({
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
  }: FileUploadArgs) {
    try {
      const defaultPath = avatar ? Path.AVATAR : Path.POSTS;
      const imageTags = tags.length ? tags : [...defaultPath.split("/")];
      const context = `alt=${alt ? alt : defaultPath.split("/")}`;

      const params: UploadParams = {
        allowed_formats: [...FilesService.formats, ...formats],
        context,
        eager: FilesService.imageTransformString({ avatar, ...args }),
        folder: path || defaultPath,
        format,
        overwrite,
        public_id: avatar ? id + "" : id + "_" + nanoid(),
        tags: imageTags,
        timestamp: Math.floor(Date.now() / 1000),
      };
      const signature = FilesService.createSignature(params);

      const res = await uploadFilesApi.post(
        `${FilesService.cloudName}/image/upload`,
        {
          file,
          api_key: FilesService.apiKey,
          signature,
          ...params,
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id: string) {
    try {
      const params: Params = {
        public_id: id,
        timestamp: Math.floor(Date.now() / 1000),
      };

      const signature = FilesService.createSignature(params);

      const res = await uploadFilesApi.post(
        `${FilesService.cloudName}/image/destroy`,
        {
          api_key: FilesService.apiKey,
          signature,
          ...params,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default FilesService;
