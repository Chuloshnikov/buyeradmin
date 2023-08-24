import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    const orders = await Order.aggregate([
      {
        $addFields: {
          createdAt: {
            $ifNull: ["$createdAt", "$updatedAt"]
          }
        }
      },
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear
          }
        }
      }
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
}





