import { SEED_METRICS } from '../data/seedSource.js';

export const getDashboardMetrics = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: SEED_METRICS,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
