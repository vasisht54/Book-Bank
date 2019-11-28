const axios = require('axios');

migrate = async()=>{

// let a = await  https.get('https://www.googleapis.com/books/v1/volumes?q=horror');

// console.log(Object.keys(a).length);
// console.log(a);

let searchCriteria = ["horror","faultinourstars","harrypotter","comedy","political","poetry","romance",
"science", "suspense","poem","math"]

let structuredData;
let count = 0;

searchCriteria.forEach(async(ele) => {
    let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${ele}`);

    // console.log(Object.keys(res.data.items).length);
    // console.log(res.data.items);
if(res.data.hasOwnProperty("items")){
    res.data.items.forEach(async(element)=>{
           count = count+1;
        try{
             structuredData = {
                title: element.volumeInfo.title,
                authors: element.volumeInfo.authors,
                publisher : "",
                publishedDate: element.volumeInfo.publishedDate,
                description: element.volumeInfo.description,
                industryIdentifiers:element.volumeInfo.industryIdentifiers,
                pagecount: element.volumeInfo.pageCount,
                categories:element.volumeInfo.categories,
                image : {},
                language: element.volumeInfo.language,
                price : {}
            };

            if(element.volumeInfo.hasOwnProperty("imageLinks")){
            if(element.volumeInfo.imageLinks.hasOwnProperty("smallThumbnail")){
                structuredData.image.smallThumbnail = element.volumeInfo.imageLinks.smallThumbnail;
            }else{
                structuredData.image.smallThumbnail = "";
            }

            if(element.volumeInfo.imageLinks.hasOwnProperty("thumbnail")){
                structuredData.image.thumbnail = element.volumeInfo.imageLinks.thumbnail;
            }else{
                structuredData.image.thumbnail = "";
            }
        }else{
            structuredData.image.smallThumbnail = "";
            structuredData.image.smallThumbnail = "";
        }

            if(element.volumeInfo.hasOwnProperty("publisher")){
                structuredData.publisher = element.volumeInfo.publisher;
            }else{
                structuredData.publisher = "";
            }


            if(element.saleInfo.sleability == "FOR_SALE"){
                structuredData.price.amount = element.saleInfo.listPrice.amount;
                structuredData.price.currency = element.saleInfo.listPrice.currencyCode;
            }else{
                structuredData.price.amount = "10.00";
                structuredData.price.currency = "USD"
            }

      await axios.post('http://localhost:5000/book/addBook',structuredData);
     

        } catch(e){
            console.log(e);
        }
            // console.log(structuredData);
        
         
           
    });

}

    console.log("count",count);
});


 }

 migrate();