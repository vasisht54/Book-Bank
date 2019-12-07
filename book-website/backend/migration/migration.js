const axios = require('axios');

migrate = async()=>{

// let a = await  https.get('https://www.googleapis.com/books/v1/volumes?q=horror');

// console.log(Object.keys(a).length);
// console.log(a);

let searchCriteria = ["horror","faultinourstars","harrypotter","comedy","political","poetry","romance",
"science", "suspense","poem","math","adult","children","animes","manga","kannada","bengalie", "harrypotter","soccer","cricket"]

let structuredData;
let count = 0;
let criteria_count = 0;
let seller = {};
let steve;
let monica;
let adam;

try{
//create sellers for  books
await axios.post("http://localhost:5000/user/register", {
first_name:"steve",
last_name: "smith",
username: "steve",
password: "steve123",
seller:{
    adminKey: "steve123"
},
usertype:"seller",
address: {
    address:"clemenson #57",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post("http://localhost:5000/user/register", {
first_name:"adam",
last_name: "backman",
username: "adam",
password: "adam123",
seller:{
    adminKey: "adam123"
},
usertype:"seller",
address: {
    address:"clemenson #58",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post("http://localhost:5000/user/register", {
first_name:"monica",
last_name: "roy",
username: "monica",
password: "monica123",
seller:{
    adminKey: "monica123"
},
usertype:"seller",
address: {
    address:"clemenson #897",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});


//get ids
 steve= await axios.get(`http://localhost:5000/user/username?q=steve`);
 adam = await axios.get(`http://localhost:5000/user/username?q=adam`);
 monica = await axios.get(`http://localhost:5000/user/username?q=monica`);
//  console.log(steve);

}catch(e){
    // console.log("errr:::::",e);
}

searchCriteria.forEach(async(ele) => {
    criteria_count++;
    if(criteria_count>0&&criteria_count<4){
        seller = steve.data[0]._id ;
    }if(criteria_count>=4 && criteria_count<7){
        seller = adam.data[0]._id ;
    }if(criteria_count>=7){
        seller = monica.data[0]._id;
    }
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
                price : {},
                seller: seller
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