import URL from '../../../url_backend';
const BASE_API = `${URL}Lopersa/`;

export const sendReport = (token, name, img, iduser, idparque, zonanovedad, comentario) => async dispatch => {
    const formData  = new FormData();
    formData.append('img-perfil', img);
    formData.append('iduser', iduser);
    formData.append('idparque', idparque);
    formData.append('zonanovedad', zonanovedad);
    formData.append('comentario', comentario);
    const query = await fetch(`${BASE_API}saveReport?nombphoto=${name}`, {
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


export const loadParques = (token) => async dispatch => {
    const query = await fetch(`${BASE_API}LoadParques`, {
        method: 'POST',
    })
    return query;
}