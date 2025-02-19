

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// مرجع للتوثيق
const auth = firebase.auth();

// إرسال رمز التحقق
function sendOTP() {
    const phoneNumber = document.getElementById("phone-number").value;
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    
    auth.signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            document.getElementById("otp-section").style.display = "block";
            alert("تم إرسال رمز التحقق");
        })
        .catch(error => {
            console.error("خطأ في إرسال الرمز", error);
        });
}

// التحقق من الرمز
function verifyOTP() {
    const code = document.getElementById("otp-code").value;
    
    confirmationResult.confirm(code)
        .then(result => {
            localStorage.setItem("loggedIn", true);
            alert("تم تسجيل الدخول بنجاح!");
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("رمز التحقق غير صحيح");
        });
}

// منع إتمام الدفع بدون تسجيل دخول
if (document.getElementById("checkout-button")) {
    document.getElementById("checkout-button").addEventListener("click", function() {
        if (!localStorage.getItem("loggedIn")) {
            alert("يجب تسجيل الدخول قبل إتمام الشراء");
            window.location.href = "login.html";
        } else {
            alert("تم إتمام الطلب بنجاح!");
        }
    });
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem("loggedIn");
    alert("تم تسجيل الخروج");
    window.location.href = "index.html";
}
