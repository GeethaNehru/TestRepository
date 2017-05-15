let rl = require('readline').createInterface({
 input: require('fs').createReadStream('data/Table1.3_g20_2013.csv')
});
let fs = require('fs');
let countryindex;
let arrayOne = [];
 
rl.on('line', (line) => {
    arrayOne.push(line);
})
.on('close', () => {
  one(arrayOne);
  
  process.exit(0);

});

function one(arrayOne){
    let header = arrayOne[0].split(',');//Retrieving header row from CSV file
    

    // Stores each row in arrayOne as a object
    let arrayTwo = [];
    for(i=1;i<arrayOne.length;i++){
        let temp_array = arrayOne[i].split(',');
        let j=0;
        let temp_obj={};
        let test = temp_array.forEach(function(x) {
                temp_obj[header[j]] = x; 
                j++
        }); // End of forEach
        arrayTwo.push(temp_obj);
    } 
    arrayTwo.forEach(function(data){
    	console.log(data)
    })


// Population for 2013 in temp_obj

    let json_plot1=[];
let population = 'Population (Millions) - 2013';
arrayTwo.forEach(function(x){

let temp_obj={};
temp_obj['Country'] = x['Country Name']; 
temp_obj['value'] = Number(x[population]);
json_plot1.push(temp_obj); 

}); 
json_plot1.splice(json_plot1.length-2,2);

json_plot1.sort(function(a,b)
{
     return parseFloat(b.value) - parseFloat(a.value)
 
  });
console.log(json_plot1);
fs.writeFileSync('population13.json',JSON.stringify(json_plot1));// End of forEach



// GDP for 2013 in temp_obj

  let json_plot2=[];
let gdp = 'GDP Billions (US$) - 2013';
arrayTwo.forEach(function(x){

let temp_obj={};
temp_obj['Country'] = x['Country Name']; 
temp_obj['value'] = Number(x[gdp]);
json_plot2.push(temp_obj); 

}); // End of forEach
json_plot2.splice(json_plot2.length-2,2);


json_plot2.sort(function(a,b)
{
     return parseFloat(b.value) - parseFloat(a.value)
 
  });
console.log(json_plot2);
         

fs.writeFileSync('gdp13.json',JSON.stringify(json_plot2));



// Purchase power for 2013 in temp_obj
let json_plot3=[];
let purchase = 'Purchasing Power in Billions ( Current International Dollar) - 2013';
arrayTwo.forEach(function(x){


let temp_obj={};
temp_obj['Country'] = x['Country Name']; 
temp_obj['value'] = Number(x[purchase]);
json_plot3.push(temp_obj); 

}); // End of forEach
json_plot3.splice(json_plot3.length-2,2);
json_plot3.sort(function(a,b)
{
     return parseFloat(b.value) - parseFloat(a.value)
 
  });

console.log(json_plot3);

fs.writeFileSync('purchase13.json',JSON.stringify(json_plot3));





//Population and Purchasing power 2010-2013

let json_plot4=[];
let population='Population (Millions) - 2010';
let population1='Population (Millions) - 2011';
let population2='Population (Millions) - 2012';
let population3='Population (Millions) - 2013';
let purchase='Purchasing Power in Billions ( Current International Dollar) - 2010';
let purchase1='Purchasing Power in Billions ( Current International Dollar) - 2011';
let purchase2='Purchasing Power in Billions ( Current International Dollar) - 2012';
let purchase3='Purchasing Power in Billions ( Current International Dollar) - 2013';
arrayTwo.forEach(function(x){
	let temp_obj={};
	temp_obj['Country']=x['Country Name'];
	temp_obj['Population_2010']=Number(x[population]);
	temp_obj['Population_2011']=Number(x[population1]);
	temp_obj['Population_2012']=Number(x[population2]);
	temp_obj['Population_2013']=Number(x[population3]);
	temp_obj['Purchase_2010']=Number(x[purchase]);
	temp_obj['Purchase_2011']=Number(x[purchase1]);
	temp_obj['Purchase_2012']=Number(x[purchase2]);
	temp_obj['Purchase_2013']=Number(x[purchase3]);


	json_plot4.push(temp_obj);

});
json_plot4.splice(json_plot4.length-2,2);
console.log(json_plot4);
fs.writeFileSync('population-purchase.json',JSON.stringify(json_plot4));





let population_Data = [];
  let gdp_Data = [];

arrayTwo.forEach(function(x){
	let temp_obj1 = {};
      let temp_obj2 = {};
      
	 temp_obj1.country = x['Country Name'];
     temp_obj1.population = [Number(x['Population (Millions) - 2010'])+Number(x['Population (Millions) - 2011'])+Number(x['Population (Millions) - 2012'])+Number(x['Population (Millions) - 2013'])];
     population_Data.push(temp_obj1);
  
// Generating GDP data
     temp_obj2.country = x['Country Name'];
     temp_obj2.gdp = [Number(x['GDP Billions (US$) - 2010'])+Number(x['GDP Billions (US$) - 2011'])+Number(x['GDP Billions (US$) - 2012'])+Number(x["GDP Billions (US$) - 2013"])];
     gdp_Data.push(temp_obj2);

});
console.log(population_Data)
console.log(gdp_Data)
	




let continents ={
      Argentina:'South America',
      Australia:'Australia',
      Brazil : 'South America',
      Canada: 'North America',
      China:'Asia',
      France:'Europe',
      Germany:'Europe',
      India:'Asia',
      Indonesia:'Asia',
      Italy:'Europe',
      Japan:'Asia',
      Mexico:'North America',
      'Republic of Korea':'Asia',
      Russia:'Europe',
      'Saudi Arabia':'Asia',
      'South Africa':'Africa',
      Turkey:'Asia',
      'United Kingdom':'Europe',
      USA:'North America',
  }
  let continent_Population ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    'North America' : 0,
    'South America':0
  }
  let continent_GDP ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    'North America' : 0,
    'South America':0
  }
  let aggregate_Data =[];

for(let i=0;i<population_Data.length;i++){
	
   continent_Population[continents[population_Data[i].country]] += parseFloat(population_Data[i].population);
 
   continent_GDP[continents[population_Data[i].country]] += parseFloat(gdp_Data[i].gdp);
 }



 
temp_obj ={};
  temp_obj.CONTINENT = 'Africa';
  temp_obj.POPULATION = continent_Population['Africa'];
  temp_obj.GDP =continent_GDP['Africa'];
  aggregate_Data.push(temp_obj);
  
  temp_obj1 ={};
  temp_obj1.CONTINENT = 'Asia';
  temp_obj1.POPULATION = continent_Population['Asia'];
  temp_obj1.GDP = continent_GDP["Asia"];
  aggregate_Data.push(temp_obj1);
  
  temp_obj2 ={};
  temp_obj2.CONTINENT = 'Australia';
  temp_obj2.POPULATION = continent_Population['Australia'];
  temp_obj2. GDP = continent_GDP['Australia'];
  aggregate_Data.push(temp_obj2);
  
  temp_obj3 ={};
  temp_obj3.CONTINENT = 'Europe';
  temp_obj3.POPULATION = continent_Population['Europe'];
  temp_obj3.GDP = continent_GDP['Europe'];
  aggregate_Data.push(temp_obj3);
  
  temp_obj4 ={};
  temp_obj4.CONTINENT = 'North America';
  temp_obj4.POPULATION = continent_Population['North America'];
  temp_obj4.GDP = continent_GDP['North America'];
  aggregate_Data.push(temp_obj4);
  
  temp_obj5 ={};
  temp_obj5.CONTINENT = 'South America';
  temp_obj5.POPULATION = continent_Population['South America'];
  temp_obj5.GDP = continent_GDP['South America'];
  aggregate_Data.push(temp_obj5);





  
  console.log(aggregate_Data);
  fs.writeFileSync('aggregate.json',JSON.stringify(aggregate_Data))
 
}
