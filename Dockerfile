FROM node:16-alpine

# Install texlive
RUN apk update && apk add texmf-dist texlive-full

# Install python
RUN apk add g++ make py3-pip

# Install pm2
RUN npm install pm2 -g

# Create target folder
RUN mkdir -p /var/www/latex2pdf

# Add package.json and package-lock.json for installation in docker
ADD ./package.json /var/www/latex2pdf/package.json
ADD ./package-lock.json /var/www/latex2pdf/package-lock.json

# Copy Node.js app into docker
COPY ./app.js ./var/www/latex2pdf/app.js

# Install packages
RUN cd /var/www/latex2pdf && npm ci && npm cache clean --force

# Set work dir
WORKDIR /var/www/latex2pdf

# Start Node.js app
CMD ["pm2-runtime", "app.js", "/var/www/latex2pdf"]

# Expose port 80 for Node.js app
EXPOSE 80
