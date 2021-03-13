import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditCategory(props) {
   
    const [title, setTitle] = useState(null);
    const [gender, setGender] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    const history = useHistory();
    const categoryID = props.location.state.category.id;

    useEffect(() => {

        fetch('http://localhost:8080/Categories/' + categoryID)
        .then((response) => response.json())
        .then((data) => { 
                          setTitle(data.category.title);
                          setGender(data.category.gender);
                          setImage(data.category.image);})
        .catch(error => console.log(error));
    }, [categoryID]);

    const handleSubmit = async e => {
        if (title === "" || gender === "") {
            setError("All fields required");
            return;
        } else {
            e.preventDefault();
            const message = await editCategoryFunc({
                title,
                gender
            }, props.location.state.category.id, props.token);
            if ((message.status === 500)){ 
                setError("Server inner problem");
                } else if (message.status === 404) {
                history.push("NotFound");
                }else if (message.status !== 200) {
                setError(message.statusText);
                } else if (message.status === 200){
                history.push("/Categories");
                } else {
                setError("Unknown problem");
                }
        }
    }
    
    async function editCategoryFunc(credentials, id, token) {
        
        var formData = new FormData();
        const fileField = document.querySelector('input[type="file"]').files[0];

        for (var property in credentials) {
            formData.append(property,credentials[property]);
        }
        
        if (fileField !== undefined) {
            formData.append('image',fileField);
        }

        return fetch('http://localhost:8080/Categories/' + id, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token.token
            }, body: formData
            }).then((response) =>  {
                return response;
             })
            .catch(error => {
                if (error.status === 404)
                    history.push("/NotFound");
            });    
    }    

    return (
        
        <div className="container rounded bg-white mt-5 center width-auto">
         <div className="row justify-content-center blue-background ">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <h3 className="font-weight-bold">{title}</h3>
                    {(() => {
                        if (image){
                            return (
                                <img className="rounded-circle mt-5" src={"http://localhost:8080/" + image} width={160} alt=""/>
                            )
                        }              
                        return null;
                    })()}                    
                </div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3"> 
                    <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                    <h6 className="bold"><Link to ={'/Categories'}>Back to categories</Link></h6>
                    </div>
                </div>
                <div className="row mt-2">
                <div className="form-group col-md-6">
                        <label htmlFor="Title">Title</label>
                        {(() => {
                        if (title){
                            return (
                                <input type="Title" className="form-control" placeholder="Title" value={title}
                                onChange={ (e) => {
                                    if (e.target.value !== '')
                                        setTitle( e.target.value ) 
                                } }/>                         )
                        }              
                        return null;
                    })()} 

                    </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="Gender">Gender</label>
                        {(() => {
                        if (gender){
                            return (
                                <input type="Gender" className="form-control" placeholder="Gender" value={gender}
                                onChange={ (e) => {
                                    if (e.target.value !== '')
                                    setGender( e.target.value ) 
                                } }/>                               )
                        }              
                        return null;
                    })()} 

                    </div>
                </div>
                <div className="row mt-3">
                    <div className="form-group col-md-6">                    
                        <label htmlFor="file">Image</label>
                        <input type='file' className="form-control" onChange={ (e) => setImage( e ) }/> 
                    </div>
                </div>

                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button"
                     onClick={handleSubmit}>Save Changes</button></div>
                </div>
                {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                         {error}
                    </Alert>
                 )}
            </div>
            </div>
      </div>
    )
}
