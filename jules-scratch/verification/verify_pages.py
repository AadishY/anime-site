from playwright.sync_api import Page, expect, sync_playwright

def verify_pages(page: Page):
    # Home page
    page.goto("http://localhost:3000")
    expect(page).to_have_title("AnimeMangaSite")
    page.screenshot(path="jules-scratch/verification/home.png")

    # Anime page
    page.goto("http://localhost:3000/anime")
    expect(page).to_have_title("AnimeMangaSite")
    page.wait_for_selector("img")
    page.screenshot(path="jules-scratch/verification/anime.png")

    # Manga page
    page.goto("http://localhost:3000/manga")
    expect(page).to_have_title("AnimeMangaSite")
    page.wait_for_selector("img")
    page.screenshot(path="jules-scratch/verification/manga.png")

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_pages(page)
        browser.close()

run_verification()
