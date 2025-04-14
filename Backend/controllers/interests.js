// controllers/interests.js
const UserInterests = require("../models/userinterests");
const User = require("../models/user");

// Update or create user interests profile
async function updateUserInterests(req, res) {
  try {
    const userId = req.userId;
    const { interests, activities, bio } = req.body;
    
    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update or create interests entry
    const updatedInterests = await UserInterests.findOneAndUpdate(
      { userId },
      { 
        interests: interests || [],
        activities: activities || [],
        bio: bio || "",
        isProfileComplete: true,
        lastUpdated: Date.now()
      },
      { upsert: true, new: true }
    );
    
    return res.status(200).json({
      message: "Interests profile updated successfully",
      profile: {
        interests: updatedInterests.interests,
        activities: updatedInterests.activities,
        bio: updatedInterests.bio,
        isProfileComplete: updatedInterests.isProfileComplete,
        lastUpdated: updatedInterests.lastUpdated
      }
    });
  } catch (error) {
    console.error("Error updating interests:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

// Get user interests profile
async function getUserInterests(req, res) {
  try {
    const userId = req.userId;
    
    const profile = await UserInterests.findOne({ userId });
    
    if (!profile) {
      return res.status(200).json({ 
        isProfileComplete: false,
        message: "Profile not yet created"
      });
    }
    
    return res.status(200).json({
      isProfileComplete: profile.isProfileComplete,
      profile: {
        interests: profile.interests,
        activities: profile.activities,
        bio: profile.bio,
        lastUpdated: profile.lastUpdated
      }
    });
  } catch (error) {
    console.error("Error fetching interests profile:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

// Check if profile is complete
async function checkProfileStatus(req, res, next) {
  try {
    const userId = req.userId;
    
    const profile = await UserInterests.findOne({ userId });
    
    // Add profile status to request object
    req.isProfileComplete = profile ? profile.isProfileComplete : false;
    
    next();
  } catch (error) {
    console.error("Error checking profile status:", error);
    // Continue to next middleware even if this check fails
    req.isProfileComplete = false;
    next();
  }
}

// Find users with matching interests
async function findUsersWithMatchingInterests(req, res) {
  try {
    const userId = req.userId;
    const { limit } = req.query;
    
    // Get user's interests
    const userProfile = await UserInterests.findOne({ userId });
    
    if (!userProfile || !userProfile.interests || userProfile.interests.length === 0) {
      return res.status(200).json({
        message: "Please add interests to your profile first",
        users: []
      });
    }
    
    // Find users with at least one matching interest
    const matchingUsers = await UserInterests.aggregate([
      {
        $match: {
          userId: { $ne: new mongoose.Types.ObjectId(userId) },
          interests: { $in: userProfile.interests }
        }
      },
      {
        $addFields: {
          matchCount: {
            $size: {
              $setIntersection: ["$interests", userProfile.interests]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          matchCount: 1,
          interests: 1,
          activities: 1,
          bio: 1,
          lastUpdated: 1,
          user: {
            name: "$userDetails.name",
            UserName: "$userDetails.UserName"
          }
        }
      },
      {
        $sort: { matchCount: -1 }
      },
      {
        $limit: parseInt(limit) || 20
      }
    ]);
    
    return res.status(200).json({
      message: `Found ${matchingUsers.length} users with similar interests`,
      users: matchingUsers
    });
  } catch (error) {
    console.error("Error finding users with matching interests:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  updateUserInterests,
  getUserInterests,
  checkProfileStatus,
  findUsersWithMatchingInterests
};