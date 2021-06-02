import URL from '../../../url_backend';
const BASE_API = `${URL}Lopersa/`;

export const uploadFile = (token, name, img) => async dispatch => {
    const formData  = new FormData();
    formData.append('img-perfil', img);
    formData.append('aaa', "1234");
    const query = await fetch(`${BASE_API}uploadFotoPerfil?nombphoto=${name}`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: formData,
    })
    return query;
}


export const registerAccount = (name, cellphone, email, nameuser, pass, id_device) => async dispatch => {
    const formData  = new FormData();
    formData.append('name_complete', name);
    formData.append('cellphone', cellphone);
    formData.append('email', email);
    formData.append('nameuser', nameuser);
    formData.append('pass', pass);
    formData.append('id_device', id_device);
    const query = await fetch(`${BASE_API}createAccount`, {
        method: 'POST',
        body: formData
    })
    return query;
}


export const login = (email, pass, id_device) => async dispatch => {
    console.log("login", email, pass, id_device)
    const formData  = new FormData();
    formData.append('email', email);
    formData.append('pass', pass);
    formData.append('id_device', id_device);
    const query = await fetch(`${BASE_API}Login`, {
        method: 'POST',
        body: formData
    })
    return query;
}