class UI {

    get1() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/json");
            },

            method:'GET',
            url:"https://query.wikidata.org/sparql?query=SELECT%20%3FpersonLabel%20%3FnationalityLabel%20WHERE%20%7B%0A%20%20%3Fperson%20wdt%3AP27%20wd%3AQ29%20%3B%0A%20%20%20%20%20%20%20%20%20%20wdt%3AP106%20wd%3AQ17125263%20%3B%0A%20%20%20%20%20%20%20%20%20%20wdt%3AP106%20wd%3AQ36180%20%3B%0A%20%20%20%20%20%20%20%20%20%20wdt%3AP27%20%3Fnationality%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20\"%5BAUTO_LANGUAGE%5D%2Cen\".%20%7D%0A%7D",

            success:function(object){

                // Load div with id="content-get-1"
                const contentGet = document.getElementById('content-get-1');

                // Clean div with id="content-get-1"
                contentGet.innerHTML = "";

                // loop to catch the objects inside the object
                for (let i=0; i<object.results.bindings.length; i++){

                    // Create div with id="element-content-get-1"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get-1");

                    // elements to String
                    let personLabel = JSON.stringify(object.results.bindings[i].personLabel.value);
                    let nationalityLabel = JSON.stringify(object.results.bindings[i].nationalityLabel.value);

                    // Add contentPost into div with id="element-content-get-1"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="1">name:${personLabel} - nationality:${nationalityLabel}</textarea><br>
                        <script type="application/ld+json">
                        {
                            "@context":"http://schema.org",
                            "@type":"Person",
                            "name":${personLabel},
                            "nationality":${nationalityLabel}
                        }
                        </script>
                    `;

                    // Add child with id="element-content-get-1" inside div with id="content-get-1" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }


    get2() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/json");
            },

            method:'GET',
            url:"https://query.wikidata.org/sparql?query=SELECT%20%3FpersonLabel%20%3FcityLabel%20WHERE%20%7B%0A%20%20%3Fperson%20wdt%3AP106%20wd%3AQ17125263%20%3B%0A%20%20%20%20%20%20%20%20%20%20wdt%3AP19%20%3Fcity%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%20%20%20%20%20%20%20%20%0A%20%20FILTER%28%3Fpopulation<50000%29%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20\"%5BAUTO_LANGUAGE%5D%2Cen\".%20%7D%0A%7D",

            success:function(object){

                // Load div with id="content-get-2"
                const contentGet = document.getElementById('content-get-2');

                // Clean div with id="content-get-2"
                contentGet.innerHTML = "";

                // loop to catch the objects inside the object
                for (let i=0; i<object.results.bindings.length; i++){

                    // Create div with id="element-content-get-2"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get-2");

                    // elements to String
                    let personLabel = JSON.stringify(object.results.bindings[i].personLabel.value)
                    let cityLabel = JSON.stringify(object.results.bindings[i].cityLabel.value);

                    // Add contentPost into div with id="element-content-get-2"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="1">name:${personLabel} - birthPlace:${cityLabel}</textarea><br>
                        <script type="application/ld+json">
                        {
                            "@context":"http://schema.org",
                            "@type":"Person",
                            "name":${personLabel},
                            "birthPlace":${cityLabel}
                        }
                        </script>
                    `;

                    // Add child with id="element-content-get-2" inside div with id="content-get-2" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }


    get3() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/json");
            },

            method:'GET',
            url:"https://query.wikidata.org/sparql?query=SELECT%20%3FpersonLabel%20%3FbirthDate%20%3FdeathDate%20WHERE%20%7B%0A%20%20%3Fperson%20wdt%3AP106%20wd%3AQ17125263%20.%0A%20%20%3Fperson%20rdfs%3Alabel%20%3FpersonLabel%20.%0A%20%20%3Fperson%20wdt%3AP569%20%3FbirthDate%20.%0A%20%20%3Fperson%20wdt%3AP570%20%3FdeathDate%20.%20%0A%20%20%3Fperson%20wdt%3AP509%20%3Fcause%20.%0A%20%20FILTER%28%3Fage%20>%2010%20%26%26%20%3Fage%20<%20100%29%20.%0A%20%20BIND%28%20year%28%3FdeathDate%29%20-%20year%28%3FbirthDate%29%20-%20if%28month%28%3FdeathDate%29<month%28%3FbirthDate%29%20%7C%7C%20%28month%28%3FdeathDate%29%3Dmonth%28%3FbirthDate%29%20%26%26%20day%28%3FdeathDate%29<day%28%3Fbirth_date%29%29%2C1%2C0%29%20as%20%3Fage%20%29%20.%0A%20%20FILTER%20%28Lang%28%3FpersonLabel%29%3D\"en\"%29%20.%0A%7D%0AORDER%20BY%20ASC%20%28%3Fage%29",

            success:function(object){

                // Load div with id="content-get-3"
                const contentGet = document.getElementById('content-get-3');

                // Clean div with id="content-get-3"
                contentGet.innerHTML = "";

                // loop to catch the objects inside the object
                for (let i=0; i<object.results.bindings.length; i++){

                    // Create div with id="element-content-get-3"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get-3");

                    // elements to String
                    let personLabel = JSON.stringify(object.results.bindings[i].personLabel.value)
                    let birthDate = JSON.stringify(object.results.bindings[i].birthDate.value);
                    let deathDate = JSON.stringify(object.results.bindings[i].deathDate.value);

                    // Add contentPost into div with id="element-content-get-3"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="1">name:${personLabel} - birthDate:${birthDate} - deathDate:${deathDate}</textarea><br>
                        <script type="application/ld+json">
                        {
                            "@context":"http://schema.org",
                            "@type":"Person",
                            "name":${personLabel},
                            "birthDate":${birthDate},
                            "deathDate":${deathDate}
                        }
                        </script>
                    `;

                    // Add child with id="element-content-get-3" inside div with id="content-get-3" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }


    get4() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/json");
            },

            method:'GET',
            url:"https://query.wikidata.org/sparql?query=SELECT%20%3FpersonLabel%20%3FgenderLabel%20WHERE%20%7B%0A%20%20%3Fperson%20wdt%3AP106%20wd%3AQ17125263%20.%0A%20%20%3Fperson%20wdt%3AP21%20wd%3AQ6581097%20.%0A%20%20%3Fperson%20wdt%3AP21%20%3Fgender%20.%0A%20%20%3Fperson%20wdt%3AP1971%20%3Fnum_children%20%3B%0A%20%20FILTER%20%28%3Fnum_children%20>%3D%202%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20\"%5BAUTO_LANGUAGE%5D%2Cen\".%20%7D%0A%7D",

            success:function(object){

                // Load div with id="content-get-4"
                const contentGet = document.getElementById('content-get-4');

                // Clean div with id="content-get-4"
                contentGet.innerHTML = "";

                // loop to catch the objects inside the object
                for (let i=0; i<object.results.bindings.length; i++){

                    // Create div with id="element-content-get-4"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get-4");

                    // elements to String
                    let personLabel = JSON.stringify(object.results.bindings[i].personLabel.value)
                    let genderLabel = JSON.stringify(object.results.bindings[i].genderLabel.value);

                    // Add contentPost into div with id="element-content-get-4"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="1">name:${personLabel} - gender:${genderLabel}</textarea><br>
                        <script type="application/ld+json">
                        {
                            "@context":"http://schema.org",
                            "@type":"Person",
                            "name":${personLabel},
                            "gender":${genderLabel}
                        }
                        </script>
                    `;

                    // Add child with id="element-content-get-4" inside div with id="content-get-4" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }


    get5() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/json");
            },

            method:'GET',
            url:"https://query.wikidata.org/sparql?query=SELECT%20%3FpersonLabel%20%3Fdate%0AWHERE%20%7B%0A%20%20%20%20%3Fperson%20wdt%3AP106%20wd%3AQ17125263%0A%20%20%20%20BIND%28MONTH%28NOW%28%29%29%20AS%20%3FnowMonth%29%0A%20%20%20%20BIND%28DAY%28NOW%28%29%29%20AS%20%3FnowDay%29%0A%20%20%20%20%3Fperson%20wdt%3AP569%20%3Fdate%20.%0A%20%20%20%20FILTER%20%28MONTH%28%3Fdate%29%20%3D%20%3FnowMonth%20%26%26%20DAY%28%3Fdate%29%20%3D%20%3FnowDay%29%0A%0ASERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20\"%5BAUTO_LANGUAGE%5D%2Cen\".%20%7D%20%20%20%0A%7DORDER%20BY%20%3Fdate",

            success:function(object){

                // Load div with id="content-get-5"
                const contentGet = document.getElementById('content-get-5');

                // Clean div with id="content-get-5"
                contentGet.innerHTML = "";

                // loop to catch the objects inside the object
                for (let i=0; i<object.results.bindings.length; i++){

                    // Create div with id="element-content-get-5"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get-5");

                    // elements to String
                    let personLabel = JSON.stringify(object.results.bindings[i].personLabel.value)
                    let birthDate = JSON.stringify(object.results.bindings[i].date.value);

                    // Add contentPost into div with id="element-content-get-5"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="1">name:${personLabel} - birthDate:${birthDate}</textarea><br>
                        <script type="application/ld+json">
                        {
                            "@context":"http://schema.org",
                            "@type":"Person",
                            "name":${personLabel},
                            "birthDate":${birthDate}
                        }
                        </script>
                    `;

                    // Add child with id="element-content-get-5" inside div with id="content-get-5" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }

}


document.getElementById('get-1').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.get1();
    // Prevent default on form submit
    e.preventDefault();
});

document.getElementById('get-2').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.get2();
    // Prevent default on form submit
    e.preventDefault();
});

document.getElementById('get-3').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.get3();
    // Prevent default on form submit
    e.preventDefault();
});

document.getElementById('get-4').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.get4();
    // Prevent default on form submit
    e.preventDefault();
});

document.getElementById('get-5').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.get5();
    // Prevent default on form submit
    e.preventDefault();
});