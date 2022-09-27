import AddImgForm from "../Components/AddImgForm";

export default function AddImg(props) {

    return (
        <main id="addImagePage">
            <h1>Add a new image...</h1>
            <AddImgForm token={props.token} setToken={props.setToken} />
        </main>
    )
}