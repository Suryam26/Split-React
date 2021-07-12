import axios from 'axios';

const FetchItems = (items) => {
    
    const itemsDetail = [];
    for (let item in items) {
        axios
            .get(items[item], {
                'headers': {
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            })
            .then(res => {
                itemsDetail.push(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    return itemsDetail;
}

export default FetchItems;