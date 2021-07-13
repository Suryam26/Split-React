const FetchItemName = (itemID, itemList) => {
    const itemName = [];
    
    for (const i in itemID) {
        for (const j in itemList) {
            if (itemID[i] === itemList[j].id) {
                itemName.push(itemList[j].name)
            }
        }
    }
    
    return itemName;
}

export default FetchItemName;