from bs4 import BeautifulSoup
import requests

webpages = ["https://www.verizon.com/smartphones/apple-iphone-15-pro/"
            ,"https://www.verizon.com/smartphones/apple-iphone-15-pro-max/"
            ,"https://www.verizon.com/smartphones/apple-iphone-15/"
            ,"https://www.verizon.com/smartphones/apple-iphone-15-plus/"
            ,"https://www.verizon.com/smartphones/google-pixel-8-pro/"
            ,"https://www.verizon.com/smartphones/google-pixel-8/"
            ,"https://www.verizon.com/smartphones/apple-iphone-14/"
            ,"https://www.verizon.com/smartphones/apple-iphone-14-plus/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-s23/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-s23-ultra/"
            ,"https://www.verizon.com/smartphones/apple-iphone-14-pro-max/"
            ,"https://www.verizon.com/smartphones/apple-iphone-14-pro/"
            ,"https://www.verizon.com/smartphones/apple-iphone-13/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-z-flip5/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-z-fold5/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-a23-5g-uw/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-s23-plus/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-a54-5g/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-s21-fe-5g/"
            ,"https://www.verizon.com/smartphones/apple-iphone-se-2022/"
            ,"https://www.verizon.com/smartphones/google-pixel-fold/"
            ,"https://www.verizon.com/smartphones/google-pixel-7a/"
            ,"https://www.verizon.com/smartphones/google-pixel-7/"
            ,"https://www.verizon.com/smartphones/samsung-galaxy-a14-5g/"]

#for loop to iterate through each phone page
for url in webpages:
    response = requests.get(url)

    if response.status_code == 200:
        page_content = response.text
        soup = BeautifulSoup(page_content, 'html.parser')
        print(soup)
    else:
        print(f"Failed to retrieve data from {url}")

