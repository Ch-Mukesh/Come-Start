#!/bin/bash

# Set Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Start the development server
npm run dev 