'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './workshop.module.css'
import { useGelXWorkshop } from '@/lib/hooks/useGelXWorkshop'
import LeadForm from './LeadForm'

const shots = [
  { src: '/gel-x-workshop/gel-x-01.jpeg', title: 'Đo form chuẩn', label: '01' },
  { src: '/gel-x-workshop/gel-x-02.jpeg', title: 'Kỹ thuật úp móng', label: '02' },
  { src: '/gel-x-workshop/gel-x-03.jpeg', title: 'Hạ móng úp', label: '03' },
  { src: '/gel-x-workshop/gel-x-04.jpeg', title: 'Form thực chiến', label: '04' },
  { src: '/gel-x-workshop/gel-x-05.jpeg', title: 'Builder gel salon', label: '05' },
  { src: '/gel-x-workshop/gel-x-06.jpeg', title: 'Hoàn thiện bề mặt', label: '06' },
]

const registrationUrl = 'https://zalo.me/0901292729'

const curriculum = [
  { title: 'GEL X', items: ['Phân tích móng', 'Kỹ thuật đo form móng chuẩn', 'Kỹ thuật Úp Móng', 'Kỹ thuật hạ móng úp'] },
  { title: 'FORM', items: ['Phân tích Form', 'Thực hành 5 form thực chiến salon'] },
  { title: 'MÔN HỖ TRỢ', items: ['Úp không mài Gờ - Không bù cứng móng'] },
  { title: 'DA SALON', items: ['Trải builder gel ứng dụng salon'] },
]

export default function GelXWorkshopClient() {
  const { data: cms } = useGelXWorkshop()
  const content = cms?.content
  const workshopShots = cms?.gallery?.length ? cms.gallery.map((item, index) => ({ src: item.public_url, title: item.title, label: String(index + 1).padStart(2, '0') })) : shots
  const workshopCurriculum = content?.curriculum?.length ? content.curriculum : curriculum
  const [active, setActive] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active !== null) closeButtonRef.current?.focus()
  }, [active])

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((current) => current === null ? 0 : (current + 1) % workshopShots.length)
      if (event.key === 'ArrowLeft') setActive((current) => current === null ? workshopShots.length - 1 : (current - 1 + workshopShots.length) % workshopShots.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('body-scroll-lock')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('body-scroll-lock')
    }
  }, [active])

  return (
    <main className={styles.page}>
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.wrap}>
        <nav className={styles.topbar} aria-label="Điều hướng workshop">
          <a href="/" className={styles.wordmark}>NAIL ELBI</a>
          <span className={styles.topbarNote}>EDUCATION / 01</span>
          <a href="#gallery" className={styles.topbarLink}>Xem kỹ thuật ↘</a>
        </nav>

        <section className={styles.hero} aria-labelledby="workshop-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span className={styles.dot} /> {content?.hero_eyebrow || 'Workshop / Gel X'}</p>
            <h1 id="workshop-title"><span>{content?.hero_title || 'GEL X'}</span><span>{content?.hero_subtitle || '1 NGÀY'}</span></h1>
            <div className={styles.claim}><i aria-hidden="true" />{content?.hero_claim || 'HỌC LÀ ỨNG DỤNG ĐƯỢC SALON'}</div>
            <p className={styles.lead}>{content?.hero_lead || 'Một ngày tập trung vào nền tảng, độ chính xác và những kỹ thuật có thể mang thẳng vào nhịp làm việc thực tế tại salon.'}</p>
            <div className={styles.heroActions}>
              <a href="#gallery" className={styles.primaryButton}>Xem ảnh kỹ thuật <span>↓</span></a>
              <a href="#curriculum" className={styles.secondaryButton}>Nội dung workshop <span>↓</span></a><a href={content?.registration_url || registrationUrl} target="_blank" rel="noreferrer" className={styles.registrationButton}>{content?.registration_label || 'Đăng ký tư vấn'} <span>↗</span></a>
            </div>
          </div>
          <button className={styles.heroImage} onClick={() => setActive(0)} aria-label="Mở ảnh chính Gel X">
            <Image src={workshopShots[0].src} alt="Kỹ thuật Gel X tại Nail Elbi" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            <span className={styles.heroTag}>Technique / 01</span>
          </button>
        </section>

        <section id="curriculum" className={styles.section} aria-labelledby="curriculum-title">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>01 / Nội dung</p><h2 id="curriculum-title">Nền tảng để làm chủ<br />mỗi form móng.</h2></div><p>Không học lan man. Từng phần được sắp xếp để bạn hiểu đúng, làm được và áp dụng vào salon.</p></div>
          <div className={styles.contentGrid}>
            <div className={styles.panel}>{workshopCurriculum.map((group, index) => <div className={styles.curriculumRow} key={group.title}><span className={styles.number}>0{index + 1}</span><div><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div></div>)}</div>
            <div className={`${styles.panel} ${styles.impactPanel}`}><p className={styles.impact}>{content?.usp_title || 'ÚP KHÔNG MÀI GỜ'}<br />{content?.usp_subtitle || 'KHÔNG BÙ CỨNG MÓNG'}</p><div className={styles.spec}><b>THỜI GIAN</b>{content?.duration || '1 NGÀY'}</div><div className={styles.spec}><b>MỤC TIÊU</b>{content?.objective || 'ỨNG DỤNG THỰC CHIẾN SALON'}</div><div className={styles.signature}><span>Người hướng dẫn</span><strong>{content?.instructor || 'Kim Ngân Lê'}</strong></div></div>
          </div>
        </section>

        <section className={styles.statement} aria-label="Tuyên ngôn workshop"><p>HỌC XONG</p><h2>ÁP DỤNG ĐƯỢC<br /><em>SALON.</em></h2><span className={styles.statementMark}>/ ELBI EDUCATION</span></section>

        <section id="register" className={styles.section} aria-labelledby="register-title"><div className={styles.sectionHead}><div><p className={styles.kicker}>03 / Đăng ký tư vấn</p><h2 id="register-title">Bắt đầu từ<br />một câu hỏi.</h2></div><p>Để lại thông tin ngắn gọn. Nhân viên Elbi sẽ liên hệ tư vấn workshop và lộ trình phù hợp với bạn.</p></div><LeadForm registrationUrl={content?.registration_url || registrationUrl} /></section>

        <section id="gallery" className={styles.section} aria-labelledby="gallery-title"><div className={styles.sectionHead}><div><p className={styles.kicker}>02 / Technique gallery</p><h2 id="gallery-title">Nhìn gần hơn<br />vào kỹ thuật.</h2></div><p>Chạm vào từng ảnh để xem chi tiết. Dùng phím mũi tên để di chuyển trong gallery.</p></div><div className={styles.gallery}>{workshopShots.map((shot, index) => <button key={shot.src} className={`${styles.shot} ${index === 0 ? styles.featuredShot : ''}`} onClick={() => setActive(index)} aria-label={`Xem ảnh ${shot.title}`}><Image src={shot.src} alt={shot.title} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 20vw" /><span><b>{shot.label}</b><em>{shot.title}</em></span></button>)}</div></section>

        <footer className={styles.footer}><a href="/">← Về Nail Elbi</a><span>Workshop Gel X / 1 ngày</span><span>NAIL ELBI / EDUCATION</span></footer>
      </div>

      {active !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Xem ảnh kỹ thuật" onClick={(event) => { if (event.target === event.currentTarget) setActive(null) }}><button ref={closeButtonRef} className={styles.close} onClick={() => setActive(null)} aria-label="Đóng ảnh">×</button><button className={`${styles.navButton} ${styles.prev}`} onClick={() => setActive((active - 1 + workshopShots.length) % workshopShots.length)} aria-label="Ảnh trước">←</button><figure className={styles.lightboxFigure}><Image src={workshopShots[active].src} alt={workshopShots[active].title} fill sizes="90vw" priority /><figcaption>{workshopShots[active].label} / {workshopShots[active].title}</figcaption></figure><button className={`${styles.navButton} ${styles.next}`} onClick={() => setActive((active + 1) % workshopShots.length)} aria-label="Ảnh tiếp theo">→</button></div>}
    </main>
  )
}
