import * as PIXI from 'pixi.js'
import { type Sheet } from '../types/sheet'

interface FrameData {
        frame: { x: number; y: number; w: number; h: number }
        sourceSize: { w: number; h: number }
        spriteSourceSize: { x: number; y: number; w: number; h: number }
        horizontalInvert: boolean
}

interface FramesData {
        [key: string]: FrameData
}

interface SpriteData {
        frames: FramesData
        animations: { [key: string]: string[] }
        meta: {
                image: string
                format: string
                size: { w: number; h: number }
                scale: string
        }
}

export class SpritesheetBuilder {
        private spriteData: SpriteData
        constructor() {
                this.spriteData = {
                        frames: {},
                        animations: {},
                        meta: {
                                image: '',
                                format: '',
                                size: { w: 0, h: 0 },
                                scale: ''
                        }
                }
        }

        setMetaData(
                imagePath: string,
                size: { w: number; h: number } = { w: -1, h: -1 },
                format: string = 'RGBA8888',
                scale: string = '1'
        ) {
                this.spriteData.meta = {
                        image: imagePath,
                        format: format,
                        size: { w: size.w, h: size.h },
                        scale: scale
                }
        }

        addRow(
                animationName: string,
                startPos: { x: number; y: number },
                numberOfFrames: number,
                horizontalInvert: boolean = false,
                frameSize: { w: number; h: number } = { w: -1, h: -1 }
        ) {
                this.spriteData.animations[animationName] = []

                if (frameSize.w == -1 || frameSize.h == -1) {
                        frameSize.w = this.spriteData.meta.size.w
                        frameSize.h = this.spriteData.meta.size.h
                }

                for (let index = 0; index < numberOfFrames; index++) {
                        const frameData: FrameData = {
                                frame: {
                                        x: startPos.x + frameSize.w * index,
                                        y: startPos.y,
                                        w: frameSize.w,
                                        h: frameSize.h
                                },
                                sourceSize: {
                                        w: frameSize.w,
                                        h: frameSize.h
                                },
                                spriteSourceSize: {
                                        x: 0,
                                        y: 0,
                                        w: frameSize.w,
                                        h: frameSize.h
                                },
                                horizontalInvert: horizontalInvert
                        }
                        this.spriteData.frames[animationName + index] = frameData
                        this.spriteData.animations[animationName].push(animationName + index)
                }
        }

        async build() {
                const spritesheet = new PIXI.Spritesheet(
                        PIXI.BaseTexture.from(
                                `https://firebasestorage.googleapis.com/v0/b/project-zefir.appspot.com/o/${this.spriteData.meta.image}?alt=media`
                        ),
                        this.spriteData
                )
                await spritesheet.parse()
                const resultSprites: { [key: string]: Sheet } = {}
                for (const key in this.spriteData.animations) {
                        const isHorizontallyInverted =
                                this.spriteData.frames[key + '0'].horizontalInvert
                        resultSprites[key] = {
                                textures: spritesheet.animations[key],
                                options: { horizontalInvert: isHorizontallyInverted }
                        }
                }

                return resultSprites
        }

        clear() {
                this.spriteData = {
                        frames: {},
                        animations: {},
                        meta: {
                                image: '',
                                format: '',
                                size: { w: 0, h: 0 },
                                scale: ''
                        }
                }
        }
}
