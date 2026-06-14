import { Metadata } from "next";
import { ImageResizer } from "@/sections/ImageResizer";

export const metadata: Metadata = {
  title: "Online Image Resizer - Resize Photo for Exam Forms | Sarkari Career Hub",
  description: "Free online tool to resize and compress images for government job applications. Reduce KB, change dimensions, and download resized photos or signatures instantly.",
  keywords: "image resizer, reduce image size, compress photo for SSC, resize image for UPSC, online image compressor",
};

export default function ImageResizerPage() {
  return (
    <>
      <main>
        <ImageResizer />
      </main>
    </>
  );
}
