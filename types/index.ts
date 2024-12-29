import { type IImage } from "@/lib/database/models/image.model";


/* eslint-disable no-unused-vars */

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== IMAGE PARAMS
export type AddImageParams = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path?: string;
};

export type UpdateImageParams = {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path?: string;
  imageId: string
};

export type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

// ====== TRANSACTION PARAMS
export type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

export type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

export type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

// ====== URL QUERY PARAMS
export type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
};

export type TransformedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
};

export interface transformationTypeTypings {
  restore: {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: {
      restore: boolean
    }
    icon: string
  }
  removeBackground: {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: {
      removeBackground: boolean
    }
    icon: string
  }
  fill: {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: {
      fillBackground: boolean
    }
    icon: string
  }
  remove: {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: {
      remove: {
        prompt: string
        removeShadow: boolean
        multiple: boolean
      }
    }
    icon: string
  }
  recolor: {
    type: TransformationTypeKey
    title: string
    subTitle: string
    config: {
      recolor: {
        prompt: string
        to: string
        multiple: boolean
      }
    }
    icon: string
  }
}

export interface Image {
  _id: string
  title: string
  transformationType: TransformationTypeKey
  publicId: string
  secureURL: string
  width: number
  height: number
  config: any
  aspectRatio: string
  color: string
  prompt: string
  author: {
    _id: string
    clerkId: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

export interface PlanInclusion {
  label: string;
  isIncluded: boolean;
}

export interface Plan {
  _id: number;
  name: string;
  icon: string;
  price: number;
  credits: number;
  inclusions: PlanInclusion[];
}

export type aspectRatioOptionsType = Record<string, { aspectRatio: string; label: string; width: number; height: number }>;
