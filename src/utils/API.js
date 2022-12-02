const BASE_URL = "https://Icecream.drazs.com/api/public/";

export const mobileLoginPostRequest = async (
    phone,
    successCallBack,
) => {
    console.log('\n\n mobileLoginPostRequest Called : ', phone);

    let formData = new FormData();

    formData.append('user_cred', phone);

    try {
        let response = await fetch(
            BASE_URL + 'api/login',
            {
                method: 'POST',
                // headers: {
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json',
                // },
                body: formData,
            },
        );
        let json = await response.json();
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
    phone = "+91" + phone;

    formData.append('email', "ankitjain.aj1996@gmail.com");
    formData.append('mobile', "8770389198");

    try {
        let response = await fetch(
            "https://Icecream.drazs.com/api/public/api/register",
            {
                method: 'POST',
                headers: {
                    // "Accept": 'application/json',
                    // 'Content-Type': 'application/json',
                },
                body: formData,
            },
        );
        let json = await response.json();
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

    try {
        let response = await fetch(
            BASE_URL + 'api/login',
            {
                method: 'POST',
                headers: {
                    // "Accept": 'application/json',
                    // 'Content-Type': 'application/json',
                },
                body: formData,
            },
        );
        let json = await response.json();
        console.log('\n\n matchOTPPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n matchOTPPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};

export const getAllNewsAPI = async (successCallBack) => {
    console.log('\n\n getAllNewsAPI Called : ');

    try {
        let response = await fetch(BASE_URL + 'api/getNews', {
            method: "GET",
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

export const getNewsCategoriesAPI = async (successCallBack) => {
    console.log('\n\n getNewsCategoriesAPI Called : ');

    try {
        let response = await fetch(BASE_URL + 'api/getNewsCategory', {
            method: "GET",
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

export const getAllBlogsAPI = async (successCallBack) => {
    console.log('\n\n getAllBlogsAPI Called : ');

    try {
        let response = await fetch(BASE_URL + 'api/getBlog', {
            method: "GET",
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

export const getAllProductsAPI = async (successCallBack) => {
    console.log('\n\n getAllProductsAPI Called : ');

    try {
        let response = await fetch(BASE_URL + 'api/getProduct', {
            method: "GET",
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
    successCallBack,
) => {
    console.log('\n\n updateUserPostRequest Called : ', phone);

    let formData = new FormData();

    formData.append('email', email);
    formData.append('mobile', phone);
    formData.append('name', name);
    formData.append('user_profile', user_profile);
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
    formData.append('business_category[1]', business_category1);
    formData.append('business_category[2]', business_category2);
    formData.append('company_logo', company_logo);
    formData.append('comapany_profile', comapany_profile);
    formData.append('gst_image', gst_image);
    formData.append('pan_image', pan_image);
    formData.append('company_brochure', company_brochure);
    formData.append('comapny_ad', comapny_ad);
    formData.append('pan_number', pan_number);

    try {
        let response = await fetch(
            BASE_URL + 'api/register',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData,
            },
        );
        let json = await response.json();
        console.log('\n\n updateUserPostRequest success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updateUserPostRequest Failed');
        console.error('error', error);
        successCallBack(null);
    }
};