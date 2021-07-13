import axios from 'axios';
import { AUTH_HEADER } from '../constants';

const FetchItems = (items) => {
    const itemsDetail = [];

    for (let item in items) {
        axios
            .get(items[item], AUTH_HEADER(localStorage.getItem('token')))
            .then(res => {
                itemsDetail.push(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    return itemsDetail;
}

export default FetchItems;