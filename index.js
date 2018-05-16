const index=require("./app");

var words=["ada","ŞsdfsdfIigqwQWĞÇŞ","oa","ğğğğğ","otobüs","otobıs","aaaa","mantık","Maİntık","trky"];

for(var i=0;i<words.length;i++){
    var s=index.koken(words[i]);
    console.log(words[i]+" % "+s+" oranında türkçe kökenli olabilir");
}

//iki ünsüzün yan yana olma durumu kurallar arasında
// olmadığı için onunla ilgili bi puanlama yapılmamış göz ardı edilmiştir.