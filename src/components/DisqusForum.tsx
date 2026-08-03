import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, AlertCircle, Send, User, ThumbsUp } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class DisqusErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Disqus embed warning:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

interface CommentItem {
  id: string;
  author: string;
  text: string;
  time: string;
  likes: number;
}

export const DisqusForum: React.FC = () => {
  // Shortname as specified in the Disqus setup prompt
  const shortname = 'https-nazrul-cdc-replicate-xnhb-vercel-app';
  const [scriptFailed, setScriptFailed] = useState(false);

  // Local interactive comments fallback
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: '1',
      author: 'Ahmad S.',
      text: 'The new exact cents keypad makes paying $14.85 at my local coffee shop so effortless! No change lost.',
      time: '10 mins ago',
      likes: 4,
    },
    {
      id: '2',
      author: 'Eileen Tan',
      text: 'Loved that I can key in the exact bill amount instead of tapping $2 or $5 multiple times.',
      time: '25 mins ago',
      likes: 7,
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Catch third-party script loading errors (e.g. Script error from cross-origin iframe/Disqus CDN)
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (
        event.message === 'Script error.' ||
        (event.filename && event.filename.includes('disqus'))
      ) {
        event.preventDefault();
        setScriptFailed(true);
        return true;
      }
    };

    window.addEventListener('error', handleGlobalError);
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  const currentUrl =
    typeof window !== 'undefined' && window.location.href
      ? window.location.href
      : 'https://voucher.redeem.gov.sg';

  const article = {
    url: currentUrl,
    id: 'cdc-vouchers-2026-forum',
    title: 'CDC Vouchers 2026 Community Discussion',
  };

  const disqusConfig = {
    url: article.url,
    identifier: article.id,
    title: article.title,
    language: 'en',
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const item: CommentItem = {
      id: Date.now().toString(),
      author: authorName.trim() || 'Resident',
      text: newComment.trim(),
      time: 'Just now',
      likes: 0,
    };

    setComments([item, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-[#1e295d] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-600" />
          <span>Community Feedback & Discussion</span>
        </h3>
        <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
          <DisqusErrorBoundary>
            {!scriptFailed ? (
              <CommentCount
                shortname={shortname}
                config={{ url: article.url, identifier: article.id, title: article.title }}
              >
                Comments
              </CommentCount>
            ) : (
              <span>{comments.length} Comments</span>
            )}
          </DisqusErrorBoundary>
        </div>
      </div>

      {/* Embed Disqus or Fallback Interactive Forum */}
      <div className="min-h-[140px]">
        <DisqusErrorBoundary>
          {!scriptFailed ? (
            <DiscussionEmbed shortname={shortname} config={disqusConfig} />
          ) : (
            <div className="space-y-4">
              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-1/3 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Share feedback on zero-waste redemption..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#00969d] hover:bg-[#008187] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-2.5">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <User className="w-3 h-3 text-teal-600" />
                        {c.author}
                      </span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-slate-700 leading-snug">{c.text}</p>
                    <div className="mt-2 flex items-center justify-end">
                      <button
                        onClick={() => handleLike(c.id)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        <ThumbsUp className="w-3 h-3 text-teal-600" />
                        <span>{c.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DisqusErrorBoundary>
      </div>
    </div>
  );
};




