import fs from "fs";

export const DeleteFile = async (filePath) => {
  await fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    return;
  });
};
