import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useMailStore } from '../store/mailStore';
import styles from '../styles/mailList.module.css';


export const MailList: React.FC = () => {
  const { mails, selectedCategory, toggleRead, toggleStarred } = useMailStore();
  const [expandedMailId, setExpandedMailId] = useState<string | null>(null);

  const filteredMails = mails.filter((mail) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Starred') return mail.starred;
    return mail.category === selectedCategory;
  });

  const handleMailClick = (mailId: string) => {
    setExpandedMailId(expandedMailId === mailId ? null : mailId);
    if (!mails.find(m => m.id === mailId)?.read) {
      toggleRead(mailId);
    }
  };

  return (
    <div className={styles.mailList}>
      {filteredMails.map((mail) => {
        const isExpanded = expandedMailId === mail.id;

        return (
          <div
            key={mail.id}
            className={`${styles.mailItem} ${!mail.read ? styles.unread : ''} ${isExpanded ? styles.expanded : ''}`}
          >
            <div
              className={styles.mailHeader}
              onClick={() => handleMailClick(mail.id)}
            >
              <div className={styles.mailHeaderLeft}>
                {!mail.read && (
                  <div className={styles.unreadDot} />
                )}
                <h3 className={styles.mailTitle}>{mail.from}</h3>
              </div>
              <div className={styles.mailHeaderRight}>
                <button
                  className={styles.starButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStarred(mail.id);
                  }}
                >
                  <Star
                    className={`${styles.starIcon} ${mail.starred ? styles.starred : ''}`}
                    size={20}
                  />
                </button>
                <span className={styles.mailDate}>{mail.date}</span>
                {isExpanded ? (
                  <ChevronUp size={20} className={styles.chevron} />
                ) : (
                  <ChevronDown size={20} className={styles.chevron} />
                )}
              </div>
            </div>
            <div className={styles.mailContent}>
              <p className={styles.mailSubject}>{mail.subject}</p>
              <div className={`${styles.mailBody} ${isExpanded ? styles.expanded : ''}`}>
                {mail.body}
              </div>
            </div>
            {mail.category && (
              <div className={styles.mailTags}>
                <span className={styles.tag}>{mail.category}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};