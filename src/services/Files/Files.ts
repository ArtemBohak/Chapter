import { nanoid } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { uploadFilesApi } from "@/src/axios";
import { hashingString } from "@/src/utils";
import { FileArgs, SetErrorType, Path } from "@/src/types";

import { Params } from "./Files.type";

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

  constructor(
    private id: string | number,
    private file?: File | string,
    private avatar?: boolean,
    private setError?: SetErrorType
  ) {}

  private createSignature(params: Params) {
    const baseString = Object.keys(params)
      .map((key) => `${key}=${params[key as keyof Params]}`)
      .join("&");

    return hashingString(`${baseString}${this.apiSecret}`);
  }

  private imageTransformString({
    transform,
    height = 216,
    width = 216,
    radius = 10,
  }: Partial<FileArgs>) {
    if (this.avatar)
      return transform
        ? transform
        : `c_thumb,h_${height},w_${width}/r_${radius}`;

    return transform ? transform : `c_thumb,h_${height},w_${width}`;
  }

  async upload({
    path,
    overwrite = true,
    format = "webp",
    tags = [],
    formats = [],
    alt,
    ...args
  }: FileArgs) {
    try {
      const defaultPath = this.avatar ? Path.AVATAR : Path.POSTS;
      const imageTags = tags.length ? tags : [...defaultPath.split("/")];
      const context = `alt=${alt ? alt : defaultPath.split("/")}`;

      const params = {
        allowed_formats: [...this.formats, ...formats],
        context,
        eager: this.imageTransformString({ ...args }),
        folder: path || defaultPath,
        format,
        overwrite,
        public_id: this.avatar ? `${this.id}` : this.id + "/" + nanoid(),
        tags: imageTags,
        timestamp: Math.floor(Date.now() / 1000),
      };
      const signature = this.createSignature(params);

      const res = await uploadFilesApi.post(`${this.cloudName}/image/upload`, {
        file: this.file,
        api_key: this.apiKey,
        signature,
        ...params,
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setError && this.setError(error);
        return error;
      }
    }
  }

  async delete() {
    try {
      const params = {
        public_id: this.id,
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
      if (error instanceof AxiosError) {
        this.setError && this.setError(error);
        return error;
      }
    }
  }
}

export default FilesService;
