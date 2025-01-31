router.get('/dashboard', adminMiddleware, adminController.getDashboard);
router.get('/profile', authMiddleware, userController.getProfile);

