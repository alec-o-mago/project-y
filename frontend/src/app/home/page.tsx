'use client';
// import Image from "next/image"; //
import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'
// import { parseCookies } from 'nookies';
// import axios from "axios";
import Button from "@/components/button";
import SearchBar from "@/components/search-bar";
import { createPost, getLast100Posts } from '../../services/postService';
import { format } from 'date-fns';
import toast from "react-hot-toast";

import {
  House, Search, Bell, Mail, SquareSlash, Bookmark, UsersRound, Zap, UserRound, CircleEllipsis, Image,
  ImagePlay, ListTodo, Smile, CalendarCheck, MapPin, Ellipsis, MessageCircle, Repeat2, Heart, ChartNoAxesColumn,
  Upload, BriefcaseBusiness,
}from "lucide-react";


export default function Home() {
  const [postContent, setPostContent] = useState<string>('');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<any>({})
  // const router = useRouter()

  useEffect(() => {
    setToken(sessionStorage?.getItem('authToken') ?? '')
    setUser(JSON.parse(sessionStorage.getItem('user') ?? '{}'))
  }, []);

  useEffect(() => {
    // console.log("TOKEN: ",token)
    fetchPosts();
  },[token]);

  const timeAgo = (timestamp: string): string => {
    const givenDate = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000)
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`
    }
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours}h`
    }
    return format(givenDate, 'MMM d')
  }

  const fetchPosts = async () => {
    try {
      const response = await getLast100Posts(token)
      // console.log('POSTS RESPONSE:\n',response)
      setPosts(response)
    } catch (error) {
      toast.error('Failed to fetch posts')
      // console.error('Failed to fetch posts:', error)
    }
  };

  const handlePostButton = async () => {
    await createPost(token, {content: postContent})
    setPostContent("")
    fetchPosts()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-0 bg-zinc-950 [&_*]:transition [&_*]:duration-250 max-h-screen overflow-y-auto">
      <div className="max-w-7xl w-full min-h-screen p-0 m-0 lg:flex">
        <div className="w-full max-w-[275px] items-center justify-between font-mono p-1 lg:p-0 hidden lg:block">
          <div>
            <div className="rounded-full hover:bg-zinc-700 w-[50px] h-[50px] m-1 p-2"><img src="/assets/y-logo-white.svg" className="w-[35px]" alt="Y logo"/></div>
            <div className="text-2xl font-semibold [&>div]:flex [&>div]:p-2 [&>div]:rounded-full [&>div]:h-[50px] [&>div:hover]:bg-zinc-700 [&_span]:ml-4" >
              <div>
                <House size={30} />
                <span>Home</span>
              </div>
              <div>
                <Search size={30} />
                <span>Explore</span>
              </div>
              <div>
                <Bell size={30} />
                <span>Notifications</span>
              </div>
              <div>
                <Mail size={30} />
                <span>Messages</span>
              </div>
              <div>
                <SquareSlash size={30} />
                <span>Grok</span>
                
              </div>
              <div>
                <Bookmark size={30} />
                <span>Saved Items</span>
              </div>
              <div>
                <BriefcaseBusiness size={30} />
                <span>Jobs</span>
              </div>
              <div>
                <UsersRound size={30} />
                <span>Communities</span>
              </div>
              <div>
                <img src="/assets/y-logo-white.svg" className="w-[30px]" alt="Y logo"/>
                <span>Premium</span>
              </div>
              <div>
                <Zap size={30} />
                <span>Verified</span>
              </div>
              <div>
                <UsersRound size={30} />
                <span>Community Notes</span>
              </div>
              <div>
                <UserRound size={30} />
                <span>Profile</span>
              </div>
              <div>
                <CircleEllipsis size={30} />
                <span>More</span>
              </div>
            </div>
            <div className="m-6 w-full"><Button label="Post" minWidth="195px" scale={1.3}/></div>
          </div>
          <div className="inline-block align-text-bottom">
            <div className="flex justify-between w-[250px]">
              <img src="/assets/default-user.jpg" className="w-[40px] rounded-full m-3" />
              <div>
                <div>
                  {user?.visibleName || "Name"}
                  </div>
                <div className="text-zinc-400">
                @{user?.username || "@username"}
                </div>
              </div>
              <div><Ellipsis/></div>
            </div>
          </div>
        </div>

        <div className="w-full min-w-[600px] items-center justify-between font-mono p-1 lg:p-0 border-x border-zinc-500">
          <div className="flex justify-around">
            <div className="p-3 text-l w-full hover:bg-zinc-700 text-center flex justify-center">
              <div className="border-b-4 border-blue-500">For You</div>
            </div>
            <div className="p-3 text-l w-full hover:bg-zinc-700 text-center">
              Following
            </div>
          </div>
          <div className="border-y border-zinc-500 flex">
            <div className=""><img src="/assets/default-user.jpg" className="w-[40px] rounded-full m-3"/></div>
            <div className="w-full">
              <div>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's Happening?!"
                  className="w-full bg-zinc-950 h-[80px] p-2 text-xl resize-none"
                />
              </div>
              <div className="flex justify-between p-2 w-full">
                <div className="flex [&>*]:m-2">
                  <Image size={20} color="#1D9BF0" />
                  <ImagePlay size={20} color="#1D9BF0" />
                  <ListTodo size={20} color="#1D9BF0" />
                  <Smile size={20} color="#1D9BF0" />
                  <CalendarCheck size={20} color="#1D9BF0" />
                  <MapPin size={20} color="#1D9BF0" />
                </div>
                <Button label="Post" onClick={handlePostButton}/>
              </div>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100%-200px)]">
            {/* POsts list here */}
            {posts.map((post:any,i:number)=>
              <div key={i} className="flex justify-left border-b border-zinc-500 m-0 p-1">
                <div><img src="/assets/default-user.jpg" className="w-[40px] rounded-full m-3" /></div>
                <div className="w-full mx-3">
                  <div className="flex justify-between">
                    <div>
                      <span>
                      {post.user.visibleName}
                      </span>
                      <span className="mx-2 text-zinc-500">
                        @{post.user.username} · {timeAgo(post.createdAt)}
                      </span>
                    </div>
                    
                    <Ellipsis size={20} color="#a1a1aa"/>
                  </div>
                  <div className="my-4">
                    {post.content} 
                  </div>
                  <div className="flex justify-between [&>div]:flex [&>div]:text-zinc-400">
                    <div>
                      <MessageCircle size={20} color="#a1a1aa"/>
                      xx
                    </div>
                    <div>
                      <Repeat2 size={20} color="#a1a1aa"/>
                      xx
                    </div>
                    <div>
                      <Heart size={20} color="#a1a1aa"/>
                      xx
                    </div>
                    <div>
                      <ChartNoAxesColumn size={20} color="#a1a1aa"/>
                      xx
                    </div>
                    <div className="flex m-0 p-0">
                      <Bookmark size={20} color="#a1a1aa"/>
                      <Upload size={20} color="#a1a1aa"/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full max-w-l items-center justify-between font-mono p-2 lg:p-4">
          <div className="p-0 mb-5 hidden lg:block">
            <SearchBar />
          </div>
          <div className="border rounded-2xl border-zinc-500 p-3 my-3 hidden lg:block">
            <div className="text-2xl font-semibold pb-4">Try Premium Basic for free</div>
            Enhance your experience with saved item folders, post editing, custom app icons, and more with Premium Basic.
            <Button label="Start 14-day free trial"/>
          </div>
          <div className="border rounded-2xl border-zinc-500 p-3 my-3">
            <div className="text-2xl font-semibold pb-4">What&apos;s Happening?</div>
            This is a portfolio website that mimics X/Twitter.
            <br />
            Most buttons do not work, but posting and retrieving posts do work.
          </div>
          <div className="border rounded-2xl border-zinc-500 p-3 my-3">
            <div className="text-2xl font-semibold pb-4">Who am I?</div>
            <div className="flex justify-between">
              <img src="/assets/default-user.jpg" className="w-[40px] rounded-full m-3" />
              <div>
                <div>
                  Alec The Wizard
                  </div>
                <div>
                  @AlecTheWizard
                </div>
              </div>
              <div><Button label="Follow"/></div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
