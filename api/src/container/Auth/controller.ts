// import { JWT_OBJECT } from "./../../types/index";
import { Request, Response } from "express";
import * as AuthService from "./service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";
import { RequestObject, tokenObject } from "./../../middleware/auth";
// const geocodingClient = require("@mapbox/mapbox-sdk/services/geocoding");

// const geocoding = geocodingClient({
//   accessToken: process.env.MAPBOX_ACCESS_TOKEN,
// });

// const reverseGeocode = geocodingClient({
//   accessToken: process.env.MAPBOX_ACCESS_TOKEN,
// }).reverseGeocode;

export const Register = async (req, res): Promise<any> => {
  try {
    const data: any = await AuthService.register(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await AuthService.login(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await AuthService.verifyAccount(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const verifyToken = async (
  req: any,
  res: Response
): Promise<Response | void> => {
  try {
    const data: any = await AuthService.verifyToken(req.tokenUser);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    return sendErrorResponse({ code: 500, res, err });
  }
};

export const getMyProfile = async (
  req: any,
  res: Response
): Promise<Response | void> => {
  try {
    const data: any = await AuthService.getMyProfile(req.tokenUser.id);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    return sendErrorResponse({ code: 500, res, err });
  }
};

export const updateProfile = async (
  req: RequestObject,
  res: Response
): Promise<Response | void> => {
  try {
    const { tokenUser }: any = req;
    const data: any = await AuthService.updateProfile(tokenUser, req.body);
    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    return sendErrorResponse({ code: 500, res, err });
  }
};

// const getAddressFromGeocode = (address: any) => {
//   let AddressFromName = {};
//   console.log(address, "check address");
//   const details = geocoding
//     .forwardGeocode({
//       query: address,
//       limit: 1,
//     })
//     .send()
//     .then((response) => {
//       const feature = response.body.features[0];
//       // const coordinates = feature.geometry.coordinates;
//       let AddressDetails = {
//         shortAddress: feature?.text,
//         longAddress: feature?.place_name,
//         longitude: feature?.center[0],
//         latitude: feature?.center[1],
//       };
//       AddressFromName = { ...AddressFromName, AddressDetails };
//       // return {
//       //   status: "success",
//       //   data: AddressFromName,
//       // };
//       // return { name: "shibu" };
//       return { details, AddressFromName };
//       // return address;
//     })
//     .catch((error) => {
//       throw {
//         code: 400,
//         message: error,
//       };
//     });
// };

// export const getAddress = async (
//   req: Request,
//   res: Response
// ): Promise<Response | void> => {
//   try {
//     geocoding
//       .forwardGeocode({
//         query: req.params?.address,
//         limit: 5,
//       })
//       .send()
//       .then((response) => {
//         const feature = response.body.features[0];
//         console.log(feature, "check features");
//         let AddressDetail: any = {
//           shortAddress: feature?.text,
//           longAddress: feature?.place_name,
//           longitude: feature?.center[0],
//           latitude: feature?.center[1],
//         };
//         sendSuccessResponse({
//           res,
//           data: AddressDetail,
//         });
//       })
//       .catch((error) => {
//         throw {
//           code: 400,
//           message: error,
//         };
//       });
//   } catch (err) {
//     return sendErrorResponse({ code: 500, res, err });
//   }
// };

// export const getAddressFromLatLng = async (
//   req: Request,
//   res: Response
// ): Promise<Response | void> => {
//   const longitude: number = Number(req.query.longitude);
//   const latitude: number = Number(req.query.latitude);
//   const coordinates = [longitude, latitude];
//   console.log(coordinates, "check coordinates");
//   reverseGeocode({
//     query: coordinates,
//     types: ["address"],
//   })
//     .send()
//     .then((response) => {
//       // The full location information is in the `features` property of the response
//       const features = response.body.features;
//       console.log(features, "check features");
//       sendSuccessResponse({ data: features, res });
//     })
//     .catch((error) => {
//       return sendErrorResponse({ code: 500, res: error });
//     });
// };

// export const getAddressFromLatLng = async (
//   req: Request,
//   res: Response
// ): Promise<Response | void> => {
//   const longitude: number = Number(req.query.longitude);
//   const latitude: number = Number(req.query.latitude);
//   const coordinates = [longitude, latitude];
//   console.log(coordinates, "check coordinates");
//   reverseGeocode({
//     query: coordinates,
//     types: ["address"],
//   })
//     .send()
//     .then((response: any) => {
//       // Get the first feature from the array of features
//       const [topResult] = response.body.features;
//       const address = topResult.place_name;
//       sendSuccessResponse({ data: address, res });
//     })
//     .catch((error: any) => {
//       return sendErrorResponse({ code: 500, res: error });
//     });
// };

export const updateAvatar = async (
  req: any,
  res: Response
): Promise<Response | void> => {
  try {
    const data: any = await AuthService.updateAvatar(
      req.tokenUser.id,
      req.file
    );
    sendSuccessResponse({
      res,
      data,
    });
  } catch (error: any) {
    res.send().json({ error: true, message: error });
  }
};
