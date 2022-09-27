import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { apiBaseUrl } from "../api/api";

export default function AddImgForm(props) {
    const [picture, setPicture] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [imgPreview, setImgPreview] = useState();
    const fileInputRef = useRef();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log("token", props.token);

    useEffect(() => {
        if (picture) {
            const imgreader = new FileReader();
            imgreader.onloadend = () => {
                setImgPreview(imgreader.result);
            }
            imgreader.readAsDataURL(picture);
        } else {
            setImgPreview(null);
        }
    }, [picture]);

    const addPost = (event) => {
        event.preventDefault();

        if (!picture) {
            setError("Please Upload an Image (ಥ﹏ಥ)");
            return;
        }

        const formData = new FormData();

        formData.set("picture", picture, picture.name);
        formData.set("title", title);
        formData.set("description", description);
        formData.set("tags", JSON.stringify(tags));

        console.log("formData", formData);

        fetch(apiBaseUrl + "/api/images/add", {
            method: "POST",
            headers: {
                token: "JWT " + props.token,
            },
            body: formData,
        }).then(resp => resp.json())
            .then(data => {
                if (data.err) {
                    setError(data.err)
                } else if (data._id && data.picture) {
                    navigate("/");
                } else {
                    setError("Unknown error, please try again.")
                }
            });
    }

    const returnHome = () => {
        navigate("/");
    }

    return (
        <>
            <div>
                <form>
                    {imgPreview ? (
                        <>
                            <div className="container-img-preview">
                                <img src={imgPreview} alt="yourImageName" />
                            </div>
                        </>
                    ) : null}

                    <input
                        accept="image/*"
                        onChange={(e) => { setPicture(e.target.files[0]); setError(""); setTitle(e.target.files[0].name.split(".")[0]); }}
                        type="file"
                        ref={fileInputRef}
                        className="invisible-file-input"
                    />

                    <div>
                        <h2 className="error-msg">{error}</h2>
                    </div>

                    {!picture ? <button className="upload-btn1" onClick={(e) => { e.preventDefault(); fileInputRef.current.click(); }}>Choose a File to upload</button>
                        : <button className="upload-btn1" onClick={(e) => { e.preventDefault(); fileInputRef.current.click(); }}>Change image</button>}


                    <div className="img-title-input-container">
                        <input type="text" id="description-input"
                            placeholder="Image Title"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <textarea id="description-input"
                        placeholder="Describe your image. Tell the story behind your fox fire or add some extra information for the viewers."
                        value={description} onChange={(e) => setDescription(e.target.value)} />

                    <TagsInput tags={tags} setTags={setTags} />

                    <button className="add-img-btn" onClick={addPost}>Add Image</button>
                </form>
            </div>
        </>
    )
}

const TagsInput = ({ tags, setTags }) => {
    const [newTag, setNewTag] = useState("");

    const addNewTagtoTagsArray = (event) => {
        event.preventDefault();

        setTags([...tags, newTag]);
        setNewTag("");
    };

    function deleteTag(event, index) {
        event.preventDefault();

        const nextTagsArray = tags.filter((_, indexOfTag) => indexOfTag !== index);
        setTags(nextTagsArray);
    };

    return (
        <div className="tag-input-container">
            <ul>
                {tags.length > 0 ? (tags.map((tag, i) =>
                    <li key={i} className="tag-list-el">
                        <span>{tag}</span>
                        <button onClick={(e) => deleteTag(e, i)} className="delete-tag-btn">X</button>
                    </li>
                )) : null}
            </ul>
            <div className="add-tags-container">
                <input type="text"
                    className="tag-input"
                    placeholder="Add a tag..."
                    value={newTag} onChange={(e) => setNewTag(e.target.value)}
                />
                <button className="add-tag-btn" onClick={addNewTagtoTagsArray}>+</button>
            </div>
        </div>
    )
}