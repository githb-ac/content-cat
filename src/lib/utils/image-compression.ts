// Image compression constants
export const MAX_BASE64_SIZE = 4 * 1024 * 1024; // 4MB target for base64
export const MAX_IMAGE_DIMENSION = 2048; // Max pixels on longest side

/**
 * Compress image while maintaining high quality
 * - Resizes if larger than MAX_IMAGE_DIMENSION
 * - Compresses as JPEG with quality adjustment to meet size target
 */
export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calculate new dimensions (maintain aspect ratio)
      let { width, height } = img;
      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        if (width > height) {
          height = Math.round((height / width) * MAX_IMAGE_DIMENSION);
          width = MAX_IMAGE_DIMENSION;
        } else {
          width = Math.round((width / height) * MAX_IMAGE_DIMENSION);
          height = MAX_IMAGE_DIMENSION;
        }
      }

      // Create canvas and draw resized image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Try different quality levels to meet size target
      const qualities = [0.92, 0.85, 0.75, 0.65, 0.5];
      for (const quality of qualities) {
        const base64 = canvas.toDataURL("image/jpeg", quality);
        if (base64.length <= MAX_BASE64_SIZE) {
          resolve(base64);
          return;
        }
      }

      // If still too large, use lowest quality
      resolve(canvas.toDataURL("image/jpeg", 0.5));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};
