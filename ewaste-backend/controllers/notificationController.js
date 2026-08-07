const Notification = require("../models/notificationModel");


// GET USER NOTIFICATIONS
exports.getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      user: req.user.id
    })
    .sort({ createdAt: -1 });


    res.json(notifications);


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }

};



// MARK NOTIFICATION AS READ
exports.markAsRead = async (req,res)=>{

  try{

    const notification = await Notification.findByIdAndUpdate(

      req.params.id,

      {read:true},

      {new:true}

    );


    res.json(notification);


  }catch(error){

    res.status(500).json({
      error:error.message
    });

  }

};