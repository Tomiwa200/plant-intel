   const infoContainer = document.getElementById('info-box');   
   const spin = document.querySelector('.spin');
     //plant details code
   document.getElementById('get-id').onclick = 
     
   
   function sendIdentification(e) {
       e.preventDefault();
       spin.classList.remove('hidden');
       if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
      
    const files = [...document.querySelector('input[type=file]').files];
    
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
          }
          reader.readAsDataURL(file)
      });
    });
    
    Promise.all(promises).then((base64files) => {
      
            
      const data = {
        api_key: 'PoledS2KAHexXwBlTlepowD43LDGCDE9HJxuR1fxpdhC7gLHms',
        images: base64files,
        // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        latitude: lat ,
        longitude: long,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        plant_details: ["common_names",
                        "url",
                        "name_authority",
                        "wiki_description",
                        "taxonomy",
                        "synonyms"],
      };
      
      fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
         console.log('success:', result)
           
        const img = result.images[0].url;
        const commonName = result.suggestions[0].plant_details.common_names;
        const url = result.suggestions[0].plant_details.url;
        const preProbability = result.suggestions[0].probability;
        const probability = Math.floor(preProbability*100);
        const nameAuthority = result.suggestions[0].plant_details.name_authority;
      
      const wikiDescription = result.suggestions[0].plant_details.wiki_description.value;
        const taxKingdom = result.suggestions[0].plant_details.taxonomy.kingdom;
        const taxPhylum = result.suggestions[0].plant_details.taxonomy.phylum;
        const taxFamily = result.suggestions[0].plant_details.taxonomy.family;
        const taxClass = result.suggestions[0].plant_details.taxonomy.class;
        const taxOrder= result.suggestions[0].plant_details.taxonomy.order;
        const taxGenus = result.suggestions[0].plant_details.taxonomy.genus;
        const taxSpecies = result.suggestions[0].plant_details.structured_name.species;
        const scienceName = result.suggestions[0].plant_details.scientific_name;
        
         /* const details = []
        for(let i=0; i<=plantId.length; i++) {
          if(plantId+i) {
               details.push(`${plantId+i}`);
          }
        } */
        /*  
         
         if(info-container) {
            spin.classList.add('hidden');
           } */
         infoContainer.innerHTML = '';
         const infoWrapper = document.createElement('div');
          infoWrapper.classList.add('info-wrapper');
         infoWrapper.innerHTML = `
         <button class='info-popup'>back</button>
         <img src="${img}" alt="">
         <p> Probability:<span>${probability}%</span></p>
         <div class="plant-detail">
              <p>Common names:<span>${commonName}</span></p>
              <p>Name Authority:<span>${nameAuthority}</span></p>
              <p>Scientific Name:<span>${scienceName}</span><p>
              <h4>Structured Name:<h4>
               <ul>
               <li>Genus:<span>${taxGenus}</span></li>
               <li>Species:<span>${taxSpecies}</span></li>
               </ul>
              <p> Wiki description:<span>${wikiDescription}</span></p>
             <h3>Taxonomy:</h3>
             <ul>
             <li>Kingdom:<span>${taxKingdom}</span></li>
             <li>Phylum:<span>${taxPhylum}</span></li>
             <li>Class:<span>${taxClass}</span></li>
             <li>Order:<span>${taxOrder}</span></li>
             <li>Family:<span>${taxFamily}</span></li>
             <li>Genus:<span>${taxGenus}</span></li>
             <li>Species:<span>${taxSpecies}</span></li>
             </ul>
             
           <a href='${url}'>Link to view more details</a>
            <p> <i> ! This site is not responsible for any damage or injury <br> caused by the interpretation of the provided information.</i></p>
          
         </div>
         `
         
              infoContainer.appendChild(infoWrapper); 
              infoContainer.classList.remove('hidden');
             
              localStorage.setItem('result', JSON.stringify(result));
              const infoPopup = infoContainer.querySelector('.info-wrapper .info-popup');
              infoPopup.addEventListener( 'click', ()=> {
                infoContainer.classList.add('hidden');
                spin.classList.add('hidden');
              });

              
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
  });
 }  
  };

       /*  //plant disease code
        document.getElementById('get-ill').onclick = function getIdentification(e) {
                   e.preventDefault();
            const files = [...document.querySelector('input[type=file]').files];
            const promises = files.map((file) => {
              return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const res = event.target.result;
                    console.log(res);
                    resolve(res);
                  }
                  reader.readAsDataURL(file)
              })
            })
            
            Promise.all(promises).then((base64files) => {
          
                    
              const info = {
                api_key: 'PoledS2KAHexXwBlTlepowD43LDGCDE9HJxuR1fxpdhC7gLHms',
                images: base64files,
                // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
                modifiers: ["crops_fast", "similar_images"],
                language: "en",
                // disease details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Disease-details
                disease_details: ["cause",
                                "common_names",
                                "classification",
                                "description",
                                "treatment",
                                "url"],
              };
              
              fetch('https://api.plant.id/v2/health_assessment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
              })
              .then(respData => respData.json())
              .then(resp => {
                console.log('Success:', resp);
            

                localStorage.setItem('resp', JSON.stringify(resp));

                
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            })
          
        }; */