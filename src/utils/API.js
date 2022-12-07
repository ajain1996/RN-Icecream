const BASE_URL = 'https://Icecream.drazs.com/api/public/';

export const getAllUsersAPI = async successCallBack => {
  try {
    let response = await fetch(BASE_URL + 'api/getAllUser', {
      method: 'GET',
    });
    let json = await response.json();
    successCallBack(json);
  } catch (error) {
    console.error('error', error);
    successCallBack(null);
  }
};

export const mobileLoginPostRequest = async (phone, successCallBack) => {
  console.log('\n\n mobileLoginPostRequest Called : ', phone);

  let formData = new FormData();
  phone = '+91' + phone;

  formData.append('user_cred', phone);

  try {
    let response = await fetch(BASE_URL + 'api/login', {
      method: 'POST',
      // headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      // },
      body: formData,
    });
    let json = await response.text();
    console.log('\n\n mobileLoginPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n mobileLoginPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const mobileRegisterPostRequest = async (
  email,
  phone,
  successCallBack,
) => {
  console.log('\n\n mobileRegisterPostRequest Called : ', phone, email);

  let formData = new FormData();
  phone = '+91' + phone;

  formData.append('email', email);
  formData.append('mobile', phone);

  try {
    let response = await fetch(
      'https://Icecream.drazs.com/api/public/api/register',
      {
        method: 'POST',
        // headers: {
        //     // "Accept": 'application/json',
        //     // 'Content-Type': 'application/json',
        // },
        body: formData,
      },
    );
    let json = await response.text();
    console.log('\n\n mobileRegisterPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n mobileRegisterPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const matchOTPPostRequest = async (phone, otpVal, successCallBack) => {
  console.log('\n\n matchOTPPostRequest Called : ', phone, otpVal);

  let formData = new FormData();

  formData.append('user_cred', phone);
  formData.append('otp', otpVal);

  try {
    let response = await fetch(BASE_URL + 'api/otpValidate', {
      method: 'POST',
      headers: {
        // "Accept": 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: formData,
    });
    let json = await response.json();
    console.log('\n\n matchOTPPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n matchOTPPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const getAllNewsAPI = async successCallBack => {
  console.log('\n\n getAllNewsAPI Called : ');

  try {
    let response = await fetch(BASE_URL + 'api/getNews', {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${bearerToken}` }
    });
    let json = await response.json();
    console.log('\n\n getAllNewsAPI success');
    successCallBack(json);
  } catch (error) {
    console.log('\n\n getAllNewsAPI Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const getNewsCategoriesAPI = async successCallBack => {
  console.log('\n\n getNewsCategoriesAPI Called : ');

  try {
    let response = await fetch(BASE_URL + 'api/getNewsCategory', {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${bearerToken}` }
    });
    let json = await response.json();
    console.log('\n\n getNewsCategoriesAPI success');
    successCallBack(json);
  } catch (error) {
    console.log('\n\n getNewsCategoriesAPI Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const getAllBlogsAPI = async successCallBack => {
  console.log('\n\n getAllBlogsAPI Called : ');

  try {
    let response = await fetch(BASE_URL + 'api/getBlog', {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${bearerToken}` }
    });
    let json = await response.json();
    console.log('\n\n getAllBlogsAPI success');
    successCallBack(json);
  } catch (error) {
    console.log('\n\n getAllBlogsAPI Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const getAllProductsAPI = async successCallBack => {
  console.log('\n\n getAllProductsAPI Called : ');

  try {
    let response = await fetch(BASE_URL + 'api/getProduct', {
      method: 'GET',
      // headers: { "Authorization": `Bearer ${bearerToken}` }
    });
    let json = await response.json();
    console.log('\n\n getAllProductsAPI success');
    successCallBack(json);
  } catch (error) {
    console.log('\n\n getAllProductsAPI Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const updateUserPostRequest = async (
  email,
  phone,
  name,
  user_profile,
  organization_name,
  short_name,
  mobile_2,
  address_1,
  address_2,
  address_3,
  country,
  state,
  city,
  landmark,
  longitude,
  gst_number,
  est_year,
  employee_number,
  turnover,
  business_category0,
  business_category1,
  business_category2,
  company_logo,
  comapany_profile,
  gst_image,
  pan_image,
  company_brochure,
  comapny_ad,
  pan_number,
  typeOfCompany,
  isImageChanged,
  token,
  successCallBack,
) => {
  console.log('\n\n updateUserPostRequest Called : ', company_brochure);
  var formdata = new FormData();
  formdata.append('token', token);
  // formdata.append('email', email);
  // formdata.append('name', name);
  // formdata.append('mobile', phone);
  formdata.append('email', email);
  formdata.append('name', name);
  formdata.append('business_type', typeOfCompany);
  formdata.append('mobile', phone);
  // 0-------
  if (isImageChanged.user_profile) {
    formdata.append('user_profile', user_profile, user_profile.name);
  }
  if (isImageChanged.company_logo) {
    formdata.append('company_logo', company_logo, company_logo.name);
  }
  if (isImageChanged.company_brochure) {
    formdata.append(
      'company_brochure',
      company_brochure,
      company_brochure.name,
    );
  }

  formdata.append('organization_name', organization_name);
  formdata.append('short_name', short_name);
  formdata.append('mobile_2', mobile_2);
  formdata.append('address_1', address_1);
  formdata.append('address_2', address_2);
  formdata.append('address_3', address_3);
  formdata.append('country', country);
  formdata.append('state', state);
  formdata.append('city', city);
  formdata.append('landmark', landmark);
  // formdata.append('latitude', '67.89');
  // formdata.append('longitude', '89.8');
  formdata.append('gst_number', gst_number);
  formdata.append('est_year', est_year);
  formdata.append('employee_number', employee_number);
  formdata.append('turnover', turnover);
  formdata.append('business_category', business_category0);

  // formdata.append('business_category[0]', business_category0);
  // formdata.append('business_category[1]', business_category1);
  // formdata.append('business_category[2]', business_category2);

  // 0000000000000000000000000
  // formdata.append('organization_name', 'Strix DIgital');
  // formdata.append('short_name', 'SD');

  // formdata.append('mobile_2', '8989510738');
  // formdata.append('address_1', 'New Durga');
  // formdata.append('address_2', 'Market');
  // formdata.append('address_3', 'Salichouka');
  // formdata.append('country', 'India');
  // formdata.append('state', 'MP');
  // formdata.append('city', 'Gadarwara');
  // formdata.append('landmark', 'Near Mandir');
  // formdata.append('latitude', '67.89');
  // formdata.append('longitude', '89.87');
  // formdata.append('gst_number', 'GS567GRt89IOI');
  // formdata.append('est_year', '2020');
  // formdata.append('employee_number', '14');
  // formdata.append('turnover', '24 L');
  // formdata.append('business_category[0]', '1');
  // formdata.append('business_category[1]', '2');
  // formdata.append('business_category[2]', '3');
  // formdata.append('business_sub_category[0]', '1');
  // formdata.append('business_sub_category[1]', '2');

  // 0000000000000

  // formdata.append('business_sub_category[0]', busis);
  // formdata.append('business_sub_category[1]', '2');
  // formdata.append('company_logo', company_logo, company_logo.uri);
  // formdata.append(
  //   'comapany_profile',
  //   fileInput.files[0],
  //   '/C:/Users/hp/Downloads/Saly-13 (1).png',
  // );
  // ---------------------------

  // formdata.append('gst_image', gst_image, gst_image.uri);
  // formdata.append('pan_image', pan_image, pan_image.uri);
  // formdata.append('comapny_ad', comapny_ad, comapny_ad.uri);

  // 0-------------------------------------

  // formdata.append('pan_number', pan_number);
  // formdata.append('certificate_issue', '1');

  formdata.append('pan_number', 'CREKG6733Y');
  formdata.append('certificate_issue', '1');

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://Icecream.drazs.com/api/public/api/updateUser', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('\n\n\n', result, ' \n\n\n<<<<<< result at update user'),
        console.log('\n\n updateUserPostRequest success: ', JSON.parse(result));
      // return null;
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
export const updateUserPostRequest1 = async (
  email,
  phone,
  name,
  user_profile,
  organization_name,
  short_name,
  mobile_2,
  address_1,
  address_2,
  address_3,
  country,
  state,
  city,
  landmark,
  longitude,
  gst_number,
  est_year,
  employee_number,
  turnover,
  business_category0,
  business_category1,
  business_category2,
  company_logo,
  comapany_profile,
  gst_image,
  pan_image,
  company_brochure,
  comapny_ad,
  pan_number,
  token,
  successCallBack,
) => {
  console.log('\n\n updateUserPostRequest Called : ', phone);

  let formData = new FormData();

  formData.append('token', token);
  formData.append('email', email);
  formData.append('mobile', phone);
  formData.append('name', name);
  // formData.append('user_profile', user_profile);
  formData.append('organization_name', organization_name);
  formData.append('short_name', short_name);
  formData.append('mobile_2', mobile_2);
  formData.append('address_1', address_1);
  formData.append('address_2', address_2);
  formData.append('address_3', address_3);
  formData.append('country', country);
  formData.append('state', state);
  formData.append('city', city);
  formData.append('landmark', landmark);
  formData.append('longitude', longitude);
  formData.append('gst_number', gst_number);
  formData.append('est_year', est_year);
  formData.append('employee_number', employee_number);
  formData.append('turnover', turnover);
  formData.append('business_category[0]', business_category0);
  // formData.append('business_category[1]', business_category1);
  formData.append('business_category[2]', business_category2);
  formData.append('company_logo', company_logo);
  formData.append('comapany_profile', comapany_profile);
  formData.append('gst_image', gst_image);
  formData.append('pan_image', pan_image);
  formData.append('company_brochure', company_brochure);
  formData.append('comapny_ad', comapny_ad);
  formData.append('pan_number', pan_number);

  try {
    let response = await fetch(BASE_URL + 'api/updateUser', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: formData,
    });
    let json = await response.json();
    console.log('\n\n updateUserPostRequest success: ', json);
    successCallBack(json);
  } catch (error) {
    console.log('\n\n updateUserPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

export const getUserById = (id, callBack) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    'https://Icecream.drazs.com/api/public/api/getUserId?user_id=' + id,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => callBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

export const getCategories = callBack => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    'https://Icecream.drazs.com/api/public/api/getBusinessCategory',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const addProductPostRequest = async (
  name,
  description,
  image,
  category0,
  category1,
  category2,
  subcategory0,
  subcategory1,
  successCallBack,
) => {
  console.log('\n\n addProductPostRequest Called : ', name);

  let formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);
  formData.append('category[0]', category0);
  formData.append('category[1]', category1);
  formData.append('category[2]', category2);
  formData.append('subcategory[0]', subcategory0);
  formData.append('subcategory[1]', subcategory1);

  try {
    let response = await fetch(BASE_URL + 'api/addProduct', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: formData,
    });
    let json = await response.json();
    console.log('\n\n addProductPostRequest success: ', json);

    successCallBack(json);
  } catch (error) {
    console.log('\n\n addProductPostRequest Failed');
    console.error('error', error);
    successCallBack(null);
  }
};

// -----------

//  This is for business category id
//  business_category[0] -- > business category
//  -//- [1] --> business type
//  -//- [2] -->

export const businessCategorybySeq = {
  '': 0,
  Manufacturer: 1,
  'Super Stokist': 2,
  Distributor: 3,
  'New Category': 4,
};
export const seqToBusinessCategory = [
  '',
  'Manufacturer',
  'Super Stokist',
  'Distributor',
  'New Category',
];
