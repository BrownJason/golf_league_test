/* eslint-disable @typescript-eslint/no-explicit-any */
import golf_bg from "../../public/uploads/golf_bg_image.jpg";
import hole_9_img1 from "../../public/uploads/hole_9_img1.jpg";
import hole_9_img2 from "../../public/uploads/hole_9_img2.jpg"; 
import hole_9_img3 from "../../public/uploads/hole_9_img3.jpg";

const images = [{
    src: golf_bg,
    title: 'Hole 1',
    description: 'First hole of Green Oaks'
},
{
    src: hole_9_img1,
    title: 'Hole 9',
    description: 'Setting sun on the 9th hole'
},
{
    src: hole_9_img2,
    title: 'Hole 9',
    description: 'Setting sun on the 9th hole'
},
{
    src: hole_9_img3,
    title: 'Hole 9',
    description: 'Setting sun on the 9th hole'
}
];

export function GetImages () {
    return images;
}