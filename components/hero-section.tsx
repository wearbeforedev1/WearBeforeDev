import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { BrandGradientText } from '@/components/brand/brand'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <main className="overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
            </div>
            <section>
                <div className="relative pt-24 md:pt-36">
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        delayChildren: 1,
                                    },
                                },
                            },
                            item: {
                                hidden: {
                                    opacity: 0,
                                    y: 20,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: 'spring' as const,
                                        bounce: 0.3,
                                        duration: 2,
                                    },
                                },
                            },
                        }}
                        className="mask-y-from-35% mask-y-to-90% absolute inset-0 top-56 lg:top-12">
                        <Image
                            src="https://images.unsplash.com/photo-1662285064441-bedb11ca7e47?q=80&w=1344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="background"
                            className="hidden size-full mix-blend-overlay dark:block"
                            width="3276"
                            height="4095"
                        />
                    </AnimatedGroup>

                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                    />

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <Link
                                    href="#how-it-works"
                                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                    <span className="text-foreground text-sm">AI try-on built for garment shops</span>
                                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedGroup>

                            <AnimatedGroup variants={transitionVariants}>
                                <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                    See the finished garment{" "}
                                    <BrandGradientText>before it&apos;s stitched</BrandGradientText>
                                </h1>
                            </AnimatedGroup>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                Your customer walks in. You snap their photo, pick the fabric — jute, linen, cotton, any colour — and WearBefore shows them exactly how they&apos;ll look once the piece is made. No guesswork. Just confident yeses at the counter.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                <div
                                    key={1}
                                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-brand rounded-xl px-5 text-base text-black"
                                        render={<Link href="/signup" />}
                                        nativeButton={false}>
                                        <span className="text-nowrap">Start free trial</span>
                                    </Button>
                                </div>
                                <Button
                                    key={2}
                                    size="lg"
                                    variant="ghost"
                                    className="h-10.5 rounded-xl px-5"
                                    render={<Link href="#how-it-works" />}
                                    nativeButton={false}>
                                    <span className="text-nowrap">Watch how it works</span>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
