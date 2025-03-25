apt-get update

install_docker(){
    for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
}


#Checking if docker is installed or not
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing Docker..."
    install_docker
else
    echo "Docker is already installed."
fi

install_nginx(){
    sudo apt update
    sudo apt install nginx

        cat > /etc/nginx/sites-available/inverntory_app <<EOF
sserver {
    listen 80;
    server_name inventory.example.com;

    location / {
        root /var/www/html/inventory_app/client/build; 
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~ /\.well-known {
        allow all;
    }

    # Additional configurations for security, SSL, etc. can be added here
}
EOF
    ln -s /etc/nginx/sites-available/mern-app  /etc/nginx/sites-enabled/
        systemctl restart nginx
}

if ! command -v nginx &> /dev/null; then
    echo "Nginx not found. Installing Nginx..."
    install_nginx
else
    echo "Nginx is already installed. Configuring..."
    install_nginx
fi

echo "Server setup complete!"



