const axios = require('axios');
let url = "http://localhost:5000/";

migrate = async()=>{

let searchCriteria = ["horror","faultinourstars","harrypotter","comedy","political","poetry","romance",
"science", "suspense","poem","math","adult","children","animes","manga","kannada","bengalie", "harrypotter","soccer","cricket",
"education", "anime", "university", "india", "usa"]

let structuredData;
let count = 0;
let criteria_count = 0;


try{

//create sellers and books
 await createSellers();
 await createBuyers();

}catch(e){
    // console.log("errr:::::",e);
}

searchCriteria.forEach(async(ele,index) => {
    let seller = "bob";
    if(index<6){
        seller = "joey";
    }
    if(index>=6 && index<12){
        seller = "monica";
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
    
            // console.log("Structured data:::::", structuredData);
      await axios.post(url+"book/addBook",structuredData);

      await createReviews(element.volumeInfo.title);



        } catch(e){
            // console.log(e);
        }      
           
    });

}
console.log("countOfItems",count);

    
});


 }


//create sellers 
const createSellers =async()=>{
    //create sellers for  books
await axios.post(url+"user/register", {

first_name:"bob",
last_name: "smith",
username: "bob",
password: "bob",
seller:{
    sellerAgreement: true
},
usertype:"seller",
address: {
    address:"clemenson #57",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post(url+"user/register", {
first_name:"joey",
last_name: "tribianni",
username: "joey",
password: "joey123",
seller:{
    sellerAgreement: true
},
usertype:"seller",
address: {
    address:"clemenson #58",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post(url+"user/register", {
first_name:"monica",
last_name: "geller",
username: "monica",
password: "monica123",
seller:{
    sellerAgreement: true
},
usertype:"seller",
address: {
    address:"clemenson #897",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});
}


//create buyers
const createBuyers =async()=>{
    //create sellers for  books
await axios.post(url+"user/register", {

first_name:"alice",
last_name: "wonderland",
username: "alice",
password: "alice",
buyer:{
    buyerAgreement: true
},
usertype:"buyer",
address: {
    address:"commonwealth ave #243",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post(url+"user/register", {
first_name:"uzumaki",
last_name: "naruto",
username: "naruto",
password: "naruto123",
buyer:{
    buyerAgreement: true
},
usertype:"buyer",
address: {
    address:"commonwealth ave #743",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});

await axios.post(url+"user/register", {
first_name:"chandler",
last_name: "bing",
username: "chandler",
password: "chandler123",
buyer:{
    buyerAgreement: true
},
usertype:"buyer",
address: {
    address:"commonwealth ave #376",
    pincode:"00215",
    city: "Boston",
    state:"MA",
    country: "USA"
}});
}


const createReviews = async(title)=>{

 let buyer1ReviewStruc ={
    buyer: "alice",
    book: title,
    review: "Aviation History delivers an entertaining account and perspective on international aviation history. This book is an"+
    "excellent resource to students, educators, and aviation enthusiasts. In reviewing this book, the principal criteria included content, "+
    "organization, and reference sources. While editing errors and organizational incongruities plague some of the latter chapters, many of the"+
    " shortcomings of this first edition will likely be alleviated by later editions. These problems are only a minor distraction to the story being told."
  }
  await axios.post(url+"review/addReview",buyer1ReviewStruc);

  let buyer2ReviewStruc ={
    buyer: "naruto",
    book: title,
    review: "The orderliness of the book conforms to an academic curriculum. While the chapters create neatly parceled packages, certain areas seem forced to conform to the ten-chapter plan."+
    "For instance, Chapter 9: Space Age Aviation seems oddly burdened by the last third of the chapter which focuses on fighter aircraft and various wars, from Vietnam to the U.S. invasion of Granada,"+
    " as well as a final section completely on private and general aviation."
  }
  await axios.post(url+"review/addReview",buyer2ReviewStruc);

  let buyer3ReviewStruc ={
    buyer: "chandler",
    book: title,
    review: "Each chapter is filled with pictures and colorful quotes from people of that era. These firsthand accounts provide deeper insight into what, in some history books, is just a listing of factual information."+
    "When the  Manfred von Richthofen describes his victory over British ace Lanoe Hawker on November 23, 1916, the day comes alive. "+
    "I was on patrol that day and observed three Englishmen who had nothing else in mind than to hunt."
  }
  await axios.post(url+"review/addReview",buyer3ReviewStruc);

}


 migrate();





