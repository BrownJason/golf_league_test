/* eslint-disable @typescript-eslint/no-explicit-any */
import golf_bg from "../../public/uploads/golf_bg_image.jpg";

const images = [{
    src: golf_bg,
    title: 'Hole 1',
    description: 'First hole of Green Oaks'
}];

export function GetImages () {
    return images;
}