# Railway Deployment Guide for Muralla

## 🚀 Quick Deploy

1. **Connect to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Deploy from project root
   railway up
   ```

2. **Set Environment Variables in Railway Dashboard:**
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://your-mongodb-atlas-connection-string
   PORT=5000
   ```

## 📁 Project Structure

```
/
├── package.json          # Root package with Railway scripts
├── railway.json          # Railway configuration
├── Dockerfile           # Docker configuration (optional)
├── server/              # Express backend
│   ├── index.js         # Main server (serves API + frontend)
│   └── src/routes/      # API routes
└── muralla-dashboard/   # Next.js frontend
    ├── app/             # Next.js pages
    └── out/             # Built static files (generated)
```

## 🔧 How It Works

1. **Build Process:**
   - Railway runs `npm run build`
   - Next.js builds to static files in `muralla-dashboard/out/`
   - Express server serves these static files

2. **Runtime:**
   - Single Express server on Railway
   - API routes: `/api/*`
   - Frontend: All other routes serve Next.js app
   - MongoDB Atlas for database

## 🌐 Environment Variables

**Required:**
- `MONGO_URI` - MongoDB Atlas connection string
- `NODE_ENV=production`

**Optional:**
- `PORT` - Railway sets this automatically
- `FRONTEND_URL` - Your Railway app URL (auto-detected)

## 📝 Local Testing

```bash
# Test the production build locally
npm run build
npm run start:production

# Visit http://localhost:5000
```

## 🔍 Troubleshooting

- **Build fails:** Check Next.js static export compatibility
- **API not working:** Verify CORS settings in server/index.js
- **Database connection:** Ensure MONGO_URI is set correctly
- **Static files 404:** Check that build process completed successfully

## 🎯 Benefits

✅ Single deployment service  
✅ Simplified environment management  
✅ Cost-effective (one service instead of two)  
✅ Automatic HTTPS and scaling  
✅ Easy rollbacks and monitoring  
