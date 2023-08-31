import * as cloudinary from 'cloudinary'
import * as fs from 'fs'


cloudinary.v2.config({
  cloud_name: "dstwutgeh",
  api_key: "398229522881186",
  api_secret: "-W6RmFX4dQ_uDPme2qh2FLPP2yw",
  secure: true
})
export const UploadFile = async  (samplefile: string) => {
  const img = await cloudinary.v2.uploader.upload(samplefile
    , {
      resource_type: 'image'
    });
  return img.secure_url
}