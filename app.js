//4. kuralda b c d g ile bitiyormu kontrolü yapmak için bcdg dizisi tanımlandı
var bcdg=['b','c','d','g'];

//Kendimce önem sırasına göre kurallara farklı puan durumu verdim,
//örneğin birinci kosul için max puan f1InitValue=20 değerindedir.
var f1InitValue=20,f2InitValue=30,f3InitValue=30,f4InitValue=10,f5InitValue=10;

//1. madde sağlanıyor mu, kelimenin içinde türkçe karakter varmı?
function birKontrol(kelime) {
    var f1d=0.0;
    var puan=((f1InitValue/7)*5);
    var ekpuan=((f1InitValue/7)*2);    
    
    var patt1 = /(ü|ö|ş|ı|ç)/gmi; 
    var result = kelime.match(patt1);//14,28   
    
    var patt2=/(İ|ğ)/gmi;
    var result2=kelime.match(patt2);//5,72
    //eğer ü|ö|ş|ı|ç varsa f1d=puan=14.28
    if(result!=null) f1d+=puan;
    
    //eğer İ ğ Ğ varsa f1d=puan+ekpuan=20;   
    if(result2!=null) f1d+=ekpuan;
    
    // eğer ü ö ş ı ç İ ğ Ğ yoksa tüm puanı 0 yapmayım diğer sesli harfler varsa
    // bir miktar puan vermek için yazılmış bir koşuldur 
    // eğer kelimenin içindeki sesli harf oranı tüm kelimenin %30 unu geçerse 10 puan verildi
    if(result==null && result2==null) {
        
        var sesliHarfSayiyi=sesliHarfVarmi(kelime);

        if(sesliHarfSayiyi>0){

            var oran=(sesliHarfSayiyi/kelime.length)*100;
            if(oran>30) {f1d+=10; return f1d;}
        }
    }
    return f1d;
}

//2. madde sağlanıyor mu, küçük ünlü uyumuna uyuyor mu
//Kural a e i ı ile başlarsa a e i ı ile biter
//yada e i ö ü ile başlarsa ı i ile bitemez
// iki kuraldan biri sağlanmalı
function ikiKontrol(kelime){
    var oran;
    var f2d=0.0;
    var flag1=false;
    var flag2=false;

    //Hangi kuralla başlayacağımıza karar veriyoruz
    for(x in kelime){
        if(kelime[x]=='a'||kelime[x]=='e'||kelime[x]=='ı'||kelime[x]=='i') 
            {flag1=true; break;}
        
        if(kelime[x]=='o'||kelime[x]=='ö'||kelime[x]=='u'||kelime[x]=='ü')
            {flag2=true; break;}
    }

    if(flag1){
        //1. kural
        var patt1 = /(a|e|ı|i)/g;
        var patt2 = /(o|ö|u|ü)/g;
        var result1 = kelime.match(patt1);
        var result2 = kelime.match(patt2);
        oran =OranHesapla(result1,result2);
        f2d=f2InitValue*oran;
        return f2d;    
    }
    
    if(flag2)
    {
        //2. kural
        var patt3 = /(o|ö|u|ü)/g;
        var patt4 = /(ı|i)/g;	
        var result3 = kelime.match(patt3);
        var result4 = kelime.match(patt4);
        oran =OranHesapla(result3,result4);
        f2d=f2InitValue*oran;
        return f2d;
    }
    //eğer içinde hiç sesli harf yoksa 0 değeri dönderiyoruz
    if(!flag1 && !flag2) {f2d=0; return f2d;}
}

// 3. madde sağlanıyor mu, büyük ünlü uyumuna uyuyormu
//Kural a ı o u ile başlarsa a ı o u biter
// yada e i ö ü ile başlarsa e i ö ü biter
function ucKontrol(kelime){
    var f3d=0.0;
    var patt2=/(a|ı|o|u)/gmi;
    var patt3=/(e|i|ö|ü)/gmi;
    //patt2 yi kuu (kalın ünlü(sesli) uyumu) ve patt3 ü iuu (ince ünlü(sesli) uyumu) e attık
    var kuu=kelime.match(patt2);
    var iuu=kelime.match(patt3);
    
    //Buradaki mantık eğer kuu ve iuu nün ikisi birden null dan farklı yada ikisi birden null ise 
    //büyük ünlü uyumuna uymaz
    if((iuu==null && kuu!=null)||(iuu!=null && kuu==null))
    {
         //büyük ünlü uyumuna uyar
         f3d=f3InitValue; 
         return f3d;       
    }else if(kuu!=null && iuu!=null){
        //büyük ünlü uyumuna uymaz puan çıkar
        var oran;
        //patt2 ve patt3 ü kendi arasında oranlayıp bir oran çıkarıyor
        // daha sonra f3InitValue ile bu oran çarpılır ve geri döndürülür.
        if(kuu.length>iuu.length)
        {
            oran=(iuu.length/kuu.length);
        }
        else if(kuu.length<iuu.length)
        {
            oran=(kuu.length/iuu.length);            
        }
        else
        {
            oran=0.5;
        }
        f3d=f3InitValue*oran;
        return f3d;
    }else{
        f3d=0;
        return f3d;
    }    
}

// 4. madde sağlanıyormu, kelime b,c,d,g ile bitiyormu
// bitiyorsa f4InitValue/2=5 bitmiyorsa f4InitValue=10 puan ver
function dortKontrol(kelime){
    var f4d=0.0;
    var uzunluk=kelime.length;
    var flag=false;
   
    for(i in bcdg){
        if((kelime[uzunluk-1]==bcdg[i]) || (kelime[uzunluk-1]==bcdg[i].toUpperCase()))
        {
            flag=true;
            break;
        }
        else{
            flag=false;
        }
    }

    if(!flag)
    {
        f4d=f4InitValue;
        return f4d;        
    }else{
        f4d=f4InitValue/2;  
        return f4d;
    }
}

// 5. madde sağlanıyormu, iki sesli yan yana mı?
function besKontrol(kelime){
    var f5d=0.0;
    var patt1 =  /(a|A|e|E|ı|I|i|İ|o|O|ö|Ö|u|U|ü|Ü)(a|A|e|E|ı|I|i|İ|o|O|ö|Ö|u|U|ü|Ü)(a|A|e|E|ı|I|i|İ|o|O|ö|Ö|u|U|ü|Ü)*/g;
    var result = kelime.match(patt1);
    
    //eğer desende hiç eşleşme yoksa f5d=f5InitValue=10 değerindedir.
    if(result==null)
    {
        f5d=f5InitValue;
        return f5d;
    }else{
        //şayet desende eşleşme varsa puanCikar fonksiyonuna gidecek
        // puan çıkar fonksiyonu kelimenin nereye kadar eşleme sağlandığına bakıp ona göre puan veriyor
        f5d=puanCikar(kelime,result,f5InitValue);
        return f5d;        
    }   
}

//kelimenin nereye kadar kurallara uygun olduğuna bakıp ona göre puan kesintisi yapıyor
function puanCikar(kelime,result,puan){
    var cumleYapisiniBozanSesli=result[0];
    var position=kelime.indexOf(cumleYapisiniBozanSesli);

    var kelimeUzunlugu=kelime.length;
    var eksipuan=((puan/kelimeUzunlugu)*(kelimeUzunlugu-position));
    return puan-eksipuan;
}

// sesli harf varmı diye bakıyoruz ve kaç tane olduğunu dönderiyoruz.
function sesliHarfVarmi(word){
    var patt1 = /(a|e|o|u)/gmi;
    var result = word.match(patt1);
    
    if(result==null) return 0;
    else return result.length;
}

function OranHesapla(result1,result2){
    var oran=1;
    if((result1!=null && result2!=null)||(result1==null && result2==null))
        {
            //kurallara uymayan bölüm burada desenlerin bir birine oranında göre oran döndürülmüştür
            if(result1.length>result2.length){
                oran=(result2.length/result1.length);
            }
            else{
                oran=(result1.length/result2.length);
            }      
            return oran;
        }
        else
        {
            //düz sesli uyumuna uyan bölüm direkt 1 oran döndürüyoruz
            return oran;                        
        }
}

function koken(word){
   var d1=birKontrol(word);
   var d2=ikiKontrol(word);
   var d3=ucKontrol(word);
   var d4=dortKontrol(word);
   var d5=besKontrol(word);
   var sonuc=d1+d2+d3+d4+d5;
  return sonuc;
}

module.exports={
    koken
};
