import pygame
import screen
img = pygame.image.load("mr_brown.png")

screen = screen.get_screen()

i=0

def goldencut (base):
    return base * 0.382

def middle (base):
    return round (base * 0.5, 0)

while True:
    events = pygame.event.get()
    mouse_pos = pygame.mouse.get_pos()

    screen.fill( (246, 198, 0) ) # fill screen with an rgb color

    screen.blit(
        img,
        (middle(480)-20, goldencut(800)-20)
    )

    for event in events:
        print event
        if event.type == pygame.MOUSEBUTTONDOWN:
            if pygame.Rect(
                (middle(480)-20, goldencut(800)-20),
                (40, 40)
            ).collidepoint(mouse_pos): #funktioniert noch nicht, muss verschoben werden
                print "Hey you tickled the shit!"

    pygame.display.flip()
