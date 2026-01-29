#!/bin/bash

echo "Setting up the project... (this may take a minute)"
npm ci --silent --loglevel=error
echo "Setup complete! Run 'npm run dev' to start the site."