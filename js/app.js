const searchField = () => {
    const searchFieldInput = document.getElementById("search-field");
    const searchText = searchFieldInput.value;
    searchFieldInput.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.data));
};

// display search result

const displaySearchResult = (phone) => {
    const displaySearchPhoneResult = document.getElementById(
        "search-phone-result"
    );
    const errorHandel = document.getElementById("error-handel");
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    displaySearchPhoneResult.textContent = "";
    errorHandel.textContent = "";
    if (phone.length == 0) {
        const error = document.createElement("div");
        error.innerHTML = `
        <h1 class="text-center text-danger">No Result found</h1>
        <p class="text-center text-danger">Please Sir Try Again</p>
        `;
        errorHandel.appendChild(error);
    } else {
        const NewData = phone.slice(0, 20);
        NewData.forEach((data) => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("col");
            newDiv.innerHTML = `
          <div class="card h-100 mb-3 shadow-lg p-4">
                      <img src="${data.image}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h4 class="card-title">Brand:${data.brand}</h4>
                        <h6 class="card-title">Phone Name:<p>${data.phone_name}</p></h6>
                        
                         <a href="#phone-details"><button onclick="phoneDetails('${data.slug}')" class="btn btn-info text-white">Details</button></a>
  
                        
                      </div>
                    </div>
          `;

            displaySearchPhoneResult.appendChild(newDiv);
        });
    }
};
// loded phone detels

const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhonesDetails(data.data));
};
const displayPhonesDetails = (data) => {
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3 shadow-lg p-4" >
    <h3 class="text-center text-primary">Product Information</h3>
    <div class="row row-cols-1 row-cols-sm-2 g-0">
      <div class="col-md-4 col-sm-12">
        <img src="${data.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8 col-sm-12">
        <div id="others">
          <h6>Brand: ${data.brand}</h6>
          <h6>Name: ${data.name}</h6>
          <h6> releaseDate: ${data.releaseDate ? data.releaseDate : 'not release date'}</h6>
          <h5 id="text-content" onclick="othersDetails('${data.slug}')" class="text-primary">others: <i class="fas fa-angle-double-right"></i></h5>
          
        </div>
      </div>
    </div>
  </div>
    `;
    phoneDetails.appendChild(div);
};

// load others details 

const othersDetails = (phoneId) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => phoneOthersDetails(data));
};
// display others details

const phoneOthersDetails = (others) => {
    const moreOthersDetails = document.getElementById("others");
    const textContent = document.getElementById("text-content");
    textContent.style.display = "none";
    const div = document.createElement("div");
    div.innerHTML = `
      <h6 class="text-primary">Main Features Info</h6>
      <h6>ChipSet: ${others.data.mainFeatures?.chipSet}</h6>
      <h6>Sensor: ${others.data.mainFeatures.sensors}</h6>
      <h6>Memory: ${others.data.mainFeatures?.memory}</h6>
      <h6>DisplaySize: ${others.data.mainFeatures?.displaySize}</p>
      <h6>DisplaySize: ${others.data.mainFeatures?.sensors}</p>
      <div id="sensors-content"></div>
      <h6 class="text-primary">Brand Others Info</h6>
      <h6 style="margin-bottom:-1px;">Bluetooth: ${others.data.others?.Bluetooth
            ? others.data.others?.Bluetooth
            : "No Bluetooth"
        }</h6>
      <h6 style="margin-bottom:-1px;">GPS: ${others.data.others?.GPS ? others.data.others?.GPS : "No GPS"
        }</h6>
      <h6 style="margin-bottom:-1px;">NFC: ${others.data.others?.NFC ? others.data.others?.NFC : "No NFC"
        }</h6>
      <h6 style="margin-bottom:-1px;">Radio: ${others.data.others?.Radio ? others.data.others?.Radio : "No Radio"
        }</h6>
      <h6 style="margin-bottom:-1px;">USB: ${others.data.others?.USB ? others.data.others?.USB : "No USB"
        }</h6>
      <h6 style="margin-bottom:-1px;">WLAN: ${others.data.others?.WLAN ? others.data.others?.WLAN : "No WLAN"
        }</h6>
      `;
    moreOthersDetails.appendChild(div);
};


