/* eslint-disable */
import { useState, useEffect } from "react";
import Image from "next/image";
import userService from "src/services/user.service";
import { toast } from "react-toastify";

const EditProfileImage = (props) => {
    const [selectedImage, setSelectedImage] = useState({
        profileImage: "",
        coverImage: "",
    });
    const imageChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        console.log("🚀 ~ EditProfileImage ~ file", file);
        console.log("🚀 ~ imageChange ~ name:", name);
        uploadImage(name, file);
    };

    console.log("🚀 ~ EditProfileImage ~ selectedImage:", selectedImage);
    const uploadImage = async (name, file) => {
        console.log("🚀 ~ uploadImage ~ name:", name);
        console.log("🚀 ~ uploadImage ~ file:", file);
        try {
            const formData = new FormData();
            formData.append(name, file);
            const response = await userService.uploadImage(formData);
            console.log("🚀 ~ uploadImage ~ response", response);
            if (response?.data?.status === "success") {
                toast.success("Image Uploaded Successfully");
                if (name === "profileImage") {
                    setSelectedImage((prev) => ({
                        ...prev,
                        profileImage: response.data.data.profileImage,
                    }));
                }
                if (name === "coverImage") {
                    setSelectedImage((prev) => ({
                        ...prev,
                        coverImage: response.data.data.coverImage,
                    }));
                }
            }
        } catch (error) {
            console.log("🚀 ~ uploadImage ~ error", error);
        }
    };

    useEffect(() => {
        console.log("🚀 ~ EditProfileImage ~ props", props?.user?.coverImage);
        if (props?.user?.coverImage) {
            setSelectedImage((prev) => ({
                ...prev,
                coverImage: props.user?.coverImage,
            }));
        }
        if (props?.user?.profileImage) {
            setSelectedImage((prev) => ({
                ...prev,
                profileImage: props.user?.profileImage,
            }));
        }
    }, [props?.user]);

    console.log("🚀 ~ EditProfileImage ~ selectedImage", selectedImage);

    return (
        <div className="nuron-information">
            <div className="profile-change row g-5">
                <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap">
                            {selectedImage.profileImage ? (
                                <img
                                    src={selectedImage.profileImage}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput1"
                                    src="/images/profile/profile-01.jpg"
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profileImage"
                                id="fatima"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="fatima" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="profile-left right col-lg-8">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap">
                            {selectedImage.coverImage ? (
                                <img
                                    src={selectedImage.coverImage}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput2"
                                    src="/images/profile/cover-01.jpg"
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="coverImage"
                                id="nipa"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="nipa" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileImage;
