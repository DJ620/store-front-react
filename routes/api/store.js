const router = require("express").Router();
const storeController = require("../../controllers/storeController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.route("/:id")
    .get(storeController.getStoreInfo);

// router.route("/edit/:userid")
//     .get(storeController.getEditor);

// router.route("/contact/:id")
//     .get(storeController)

router.route("/create")
    .post(storeController.createStore);

router.route("/update/:storeid")
    .put(storeController.updateStore);

router.route("/delete/:storeid")
    .delete(storeController.deleteStore);
    
module.exports = router;