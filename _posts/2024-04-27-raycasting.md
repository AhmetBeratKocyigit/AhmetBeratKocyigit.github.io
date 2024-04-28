---
title: Basic Raycasting With Python 
date: 2024-04-27 23:30:00 -500
categories: [Tutorial]
tags: [python]
---

# 3D Raycasting Engine

This project is a simple implementation of a 3D raycasting engine using Python and the Pygame library. Raycasting is a technique used to create 3D world simulations.

## Introduction

Raycasting is a rendering technique used in computer graphics to create a 3D perspective in a 2D map. In this project, we simulate a 3D environment by casting rays from the player's viewpoint and rendering the scene accordingly.

## How It Works

The player navigates through the 3D environment using keyboard controls. Raycasting is used to calculate the distance from the player to the walls in the scene, which determines the height of the walls in the rendered view. The scene is then drawn on the screen using Pygame.

## Features

- Simple 3D environment simulation
- Player movement and rotation
- Basic wall rendering using raycasting

## Installation

### Prerequisites

- Python 3.x
- Pygame library

### Installation

1. Install Python from [Python's Official Website](https://www.python.org/downloads/).
2. Install Pygame by running `pip install pygame` in your terminal.

## Usage

1. Clone the repository or download the source code.
2. Navigate to the project directory using the terminal.
3. Run the command `python raycasting.py` to start the project.

## Controls

- Use the arrow keys to move forward, backward, and rotate left or right.
- Press the ESC key to exit the game.

## Code 

    ```python
    import pygame
    import sys
    import math

    # Ekran boyutları
    WIDTH, HEIGHT = 800, 600

    # Oyuncunun başlangıç konumu ve yönü
    player_pos = [4.5, 4.5]
    player_dir = [-1, 0]
    player_plane = [0, 0.66]

    # Harita
    world_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

    def draw(screen):
        screen.fill((0, 0, 0))
        
        for x in range(WIDTH):
            
            camera_x = 2 * x / WIDTH - 1
            ray_dir_x = player_dir[0] + player_plane[0] * camera_x
            ray_dir_y = player_dir[1] + player_plane[1] * camera_x
            
            if ray_dir_y != 0:
                delta_dist_y = abs(1 / ray_dir_y)
            else:
                delta_dist_y = float('inf')

           
            map_x = int(player_pos[0])
            map_y = int(player_pos[1])

            
            if ray_dir_y != 0:
                delta_dist_x = abs(1 / ray_dir_x)
            else:
                delta_dist_x = float('inf')

            step_x = -1 if ray_dir_x < 0 else 1
            step_y = -1 if ray_dir_y < 0 else 1

            if ray_dir_x < 0:
                side_dist_x = (player_pos[0] - map_x) * delta_dist_x
            else:
                side_dist_x = (map_x + 1.0 - player_pos[0]) * delta_dist_x
            if ray_dir_y < 0:
                side_dist_y = (player_pos[1] - map_y) * delta_dist_y
            else:
                side_dist_y = (map_y + 1.0 - player_pos[1]) * delta_dist_y

            hit = 0
            side = 0

            while hit == 0:
                if side_dist_x < side_dist_y:
                    side_dist_x += delta_dist_x
                    map_x += step_x
                    side = 0
                else:
                    side_dist_y += delta_dist_y
                    map_y += step_y
                    side = 1
                if world_map[map_x][map_y] > 0:
                    hit = 1

            if ray_dir_y != 0:
                if side == 0:
                    perp_wall_dist = (map_x - player_pos[0] + (1 - step_x) / 2) / ray_dir_x
                else:
                    perp_wall_dist = (map_y - player_pos[1] + (1 - step_y) / 2) / ray_dir_y
            else:
                perp_wall_dist = float('inf')

            
            line_height = HEIGHT / perp_wall_dist
            draw_start = int(-line_height / 2 + HEIGHT / 2)
            if draw_start < 0:
                draw_start = 0
            draw_end = int(line_height / 2 + HEIGHT / 2)
            if draw_end >= HEIGHT:
                draw_end = HEIGHT - 1

            
            color = (255, 255, 255)
            if side == 1:
                color = (128, 128, 128)
            
            
            pygame.draw.line(screen, color, (x, draw_start), (x, draw_end), 1)

        pygame.display.flip()


    def main():
        pygame.init()
        screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("3D Raycaster")

        clock = pygame.time.Clock()

        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
            
            keys = pygame.key.get_pressed()
            if keys[pygame.K_ESCAPE]:
                running = False

            # Oyuncu hareketi
            move_speed = 0.05
            rot_speed = 0.03

            if keys[pygame.K_UP]:
                new_x = player_pos[0] + player_dir[0] * move_speed
                new_y = player_pos[1] + player_dir[1] * move_speed
                if world_map[int(new_x)][int(player_pos[1])] == 0:
                    player_pos[0] = new_x
                if world_map[int(player_pos[0])][int(new_y)] == 0:
                    player_pos[1] = new_y

            if keys[pygame.K_DOWN]:
                new_x = player_pos[0] - player_dir[0] * move_speed
                new_y = player_pos[1] - player_dir[1] * move_speed
                if world_map[int(new_x)][int(player_pos[1])] == 0:
                    player_pos[0] = new_x
                if world_map[int(player_pos[0])][int(new_y)] == 0:
                    player_pos[1] = new_y

            if keys[pygame.K_LEFT]:
                old_dir_x = player_dir[0]
                player_dir[0] = player_dir[0] * math.cos(rot_speed) - player_dir[1] * math.sin(rot_speed)
                player_dir[1] = old_dir_x * math.sin(rot_speed) + player_dir[1] * math.cos(rot_speed)
                old_plane_x = player_plane[0]
                player_plane[0] = player_plane[0] * math.cos(rot_speed) - player_plane[1] * math.sin(rot_speed)
                player_plane[1] = old_plane_x * math.sin(rot_speed) + player_plane[1] * math.cos(rot_speed)

            if keys[pygame.K_RIGHT]:
                old_dir_x = player_dir[0]
                player_dir[0] = player_dir[0] * math.cos(-rot_speed) - player_dir[1] * math.sin(-rot_speed)
                player_dir[1] = old_dir_x * math.sin(-rot_speed) + player_dir[1] * math.cos(-rot_speed)
                old_plane_x = player_plane[0]
                player_plane[0] = player_plane[0] * math.cos(-rot_speed) - player_plane[1] * math.sin(-rot_speed)
                player_plane[1] = old_plane_x * math.sin(-rot_speed) + player_plane[1] * math.cos(-rot_speed)

            draw(screen)
            clock.tick(60)

        pygame.quit()
        sys.exit()

    if __name__ == "__main__":
        main()

    ```
## Contributing

Contributions are welcome! If you want to contribute to this project, feel free to open a pull request on GitHub. Fixes, improvements, and suggestions are always appreciated.

