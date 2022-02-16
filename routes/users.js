const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const {
    csrfProtection,
    asyncHandler
} = require('./utils')
const {
    loginUser,
    logoutUser
} = require('../auth');

const router = express.Router();


/* GET users listing. */
router.get('/signup', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('user-signup', {
        title: 'Sign Up',
        user,
        csrfToken: req.csrfToken(),
    });
});

const userValidators = [
    check("userName")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a value for the username field!")
    .isLength({
        max: 25
    })
    .withMessage("The username must be less than 25 characters!")
    .custom((userName) => {
        return db.User.findOne({
                where: {
                    userName
                }
            })
            .then((user) => {
                if (user) return Promise.reject("The provided username is already being used");
            });
    }),
    check("emailAddress")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a value for email address!")
    .isLength({
        max: 50
    })
    .withMessage("Email address must be less than 50 characters!")
    .isEmail()
    .withMessage("Email address is not a valid email!")
    .custom((email) => {
        return db.User.findOne({
                where: {
                    emailAddress: email
                }
            })
            .then((user) => {
                if (user) return Promise.reject("The provided email address is already being used by another user!")
            });
    }),
    check("password")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a value for password")
    .isLength({
        max: 50
    })
    .withMessage("Password must be less than 50 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage("Password must contain at least one lowercase letter, one uppercase letter, a number, and a special character (!@#$%^&*)"),
    check("confirmPassword")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a value for confirm password")
    .isLength({
        max: 50
    })
    .withMessage("Confirm Password must be less than 50 characters")
    .custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error("Confirm Password does not match password");
        }

        return true;
    })
]



router.post('/signup', csrfProtection, userValidators,
asyncHandler(async (req, res) => {
    const {
        emailAddress,
        userName,
        password
    } = req.body;

    const user = db.User.build({
        emailAddress,
        userName: userName.trim(),
    });

    const validatorErrors = validationResult(req);

    console.log(req.body)

    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user.hashedPassword = hashedPassword;

        await user.save();

        loginUser(req, res, user);
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error => error.msg))

        console.log(errors)

        res.render('user-signup', {
            title: "Sign Up",
            user,
            errors,
            csrfToken: req.csrfToken()
        });
    }
}));

router.get('/login', csrfProtection, (req, res) => {
    res.render('user-login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
    })
});

const loginValidator = [
    check('emailAddress')
    .exists({
        checkFalsy: true
    })
    .withMessage('Please provide a correct email address!'),
    check('password')
    .exists({
        checkFalsy: true
    })
    .withMessage('Please provide a correct password value!')
];

router.post('/login', csrfProtection, loginValidator, asyncHandler(async (req, res) => {
    const {
        emailAddress,
        password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({
            where: {
                emailAddress
            }
        });

        if (user !== null) {
            const passwordCheck = await bcrypt.compare(password, user.hashedPassword.toString());

            if (passwordCheck) {
                loginUser(req, res, user);
                return res.redirect('/');
            }
        }

        errors.push('Login attempt has failed for provided email address and password ya dummy!');
    } else {
        errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('user-login', {
        title: 'Login',
        emailAddress,
        errors,
        csrfToken: req.csrfToken(),
    });
}))


router.get('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/users/login');
})

module.exports = router;
