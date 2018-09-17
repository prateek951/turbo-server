// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();
const HTTP_STATUS = require("http-status-codes");
const Profile = require("../models/Profile");

//@desc('GET','/profiles','retrieve the list of all the profiles')

router.get("/profiles", (req, res) => {
  const query = req.query;

  Profile.find(query)
    .then(profiles =>
      res.status(HTTP_STATUS.OK).json({
        confirmation: "success",
        data: profiles
      })
    )
    .catch(err =>
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        confirmation: "fail",
        message: err.message
      })
    );
});

//@desc('GET','/profiles/ds','retrieve the list of those profiles where team is datascientists')

router.get("/profiles/ds", (req, res) => {
  Profile.find({ team: "datascientists" })
    .then(profiles => {
      res.status(HTTP_STATUS.OK).json({
        confirmation: "success",
        data: profiles
      });
    })
    .catch(err => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

//@desc('GET','/profile/update','Update a profile')
// This is Non restful though
router.get("/profile/update", (req, res) => {
  const query = req.query; //require an id, key values to update for the profile
  //   Profile.update(query)
  //     .then(profile => {
  //       if (profile) {
  //         res.status(HTTP_STATUS.OK).json({
  //           confirmation: "success",
  //           data: profile
  //         });
  //       }
  //     })
  //     .catch(err =>
  //       res
  //         .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
  //         .json({ confirmation: "fail", message: err.message })
  //     );

  const profile_id = query.id;
  Profile.findByIdAndUpdate(profile_id, query, { new: true })
    .then(profile => {
      if (profile) {
        res.status(HTTP_STATUS.OK).json({
          confirmation: "success",
          data: profile
        });
      }
    })
    .catch(err =>
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        confirmation: "fail",
        message: err.message
      })
    );

  // res.status(HTTP_STATUS.OK).json({
  // 	confirmation: 'success',
  // 	data: 'This is the update end point'
  // });
});

//@desc('DELETE','/profile/:id','Delete a specific profile')
//restful (can be checked using POSTMAN or PUTTY client)
// router.delete('/profile/remove/:id',async (req, res) => {
// 	await Profile.remove({_id : req.params.id});
// 	res.json({});
// });

//Delete request using GET Non restful
// router.get("/profile/remove", async (req, res) => {
//   const query = req.query;
//   try {
//     await Profile.remove({_id : query.id});
//     res.status(HTTP_STATUS.OK).json({
// 	  confirmation: "success",
// 	  data: {}
//     });
//   } catch (error) {
// 	res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
// 		confirmation: "fail",
// 		message: error.message
// 	  });
//   }
// });

// Delete Profile in NON restful manner
router.get('/profile/remove',(req, res) => {
  const query = req.query;
  Profile.findByIdAndRemove(query.id)
  .then(() => res.status(HTTP_STATUS.OK).json({
    confirmation: 'success',
    data: {}
  }))
  .catch(err => res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    confirmation: 'fail',
    message: err.message
  }));
});


//@desc('GET','/profiles/:id','Retrieve a specific profile')

router.get("/profiles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (profile)
      res
        .status(HTTP_STATUS.OK)
        .json({ confirmation: "success", data: profile });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      confirmation: "fail",
      message: `Profile ${id} not found`
    });
  }
});

//@desc('POST','/profile','Create a profile')

router.post("/profile", (req, res) => {
  // const { firstname, lastname, age, position, team } = req.body;
  // res.status(HTTP_STATUS.OK).json({
  // 	confirmation: 'success',
  // 	data: req.body
  // })
  Profile.create(req.body)
    .then(profile => {
      if (profile)
        res.status(HTTP_STATUS.OK).json({
          confirmation: "success",
          data: profile,
          message: "Profile got created"
        });
    })
    .catch(err =>
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ confirmation: "fail", message: err.message })
    );
});

module.exports = router;
